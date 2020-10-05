namespace BBWT.Services.Classes
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Diagnostics;
    using System.Linq;
    using System.Security.Principal;
    using System.Web.Security;
    using BBWT.Data.Membership;
    using BBWT.Domain;
    using BBWT.Services.Interfaces;
    using WebMatrix.WebData;

    /// <summary>
    /// Membership Service class
    /// </summary>
    public class MembershipService : IMembershipService
    {
        private const int CUSTOM_PERMISSION_ID = 1000;

        private readonly IDataContext context;

        private readonly IPrincipal principal;

        private readonly User currentUser;

        /// <summary>Constructs membersip service</summary>
        /// <param name="ctx">context injection</param>
        /// <param name="principal">current user injection</param>
        public MembershipService(IDataContext ctx, IPrincipal principal)
        {
            Debug.Assert(ctx != null, "Data context should not be null");
            Debug.Assert(principal != null, "User should not be null");

            this.context = ctx;
            this.principal = principal;

            this.currentUser = 
                this.principal.Identity.IsAuthenticated ? 
                this.GetUserByName(this.principal.Identity.Name) : null;
        }

        /// <summary>Create group</summary>
        /// <param name="group">Group</param>
        public void CreateGroup(Group group)
        {
            this.context.Groups.Add(group);
            this.context.Commit();
        }

        /// <summary>Create permission</summary>
        /// <param name="permission">Permission to create</param>
        public void CreatePermission(Permission permission)
        {
            Debug.Assert(permission != null, "Empty permission can't be created");
            Debug.Assert(permission.Id == 0, "Permission to create should have no identity value");

            var id = this.context.Permissions.Max(p => p.Id);
            permission.Id = Math.Max(id + 1, CUSTOM_PERMISSION_ID);

            this.context.Permissions.Add(permission);
            this.context.Commit();
        }

        /// <summary>Create role</summary>
        /// <param name="role">Role</param>
        public void CreateRole(Role role)
        {
            this.context.Roles.Add(role);
            this.context.Commit();
        }

        /// <summary>Create user</summary>
        /// <param name="user">user to create</param>
        /// <param name="pass">password</param>
        public void CreateUser(User user, string pass = "")
        {
            Debug.Assert(user != null, "Empty user can't be created");
            Debug.Assert(user.Id == 0, "User to create should have no identity value");

            if (!this.context.Users.Any(u => u.Name == user.Name))
            {
                this.context.Users.Add(user);
                this.context.Commit();

                WebSecurity.CreateAccount(user.Name, string.IsNullOrEmpty(pass) ? "password" : pass);
            }
            else
            {
                throw new Exception("User already exists.");
            }
        }

        /// <summary>Delete group</summary>
        /// <param name="id">group ID</param>
        public void DeleteGroup(int id)
        {
            var group = this.context.Groups.Find(id);
            if (group == null)
            {
                return;
            }

            this.context.Groups.Remove(group);
            this.context.Commit();
        }

        /// <summary>delete permission by id</summary>
        /// <param name="id">permission id</param>
        public void DeletePermission(int id)
        {
            Debug.Assert(id > 0, "Permission should have valid identity");

            if (id < CUSTOM_PERMISSION_ID)
            {
                return;
            }

            var permission = this.context.Permissions.Find(id);
            if (permission == null)
            {
                return;
            }

            this.context.Permissions.Remove(permission);
            this.context.Commit();
        }

        /// <summary>Delete role</summary>
        /// <param name="id">Role ID</param>
        public void DeleteRole(int id)
        {
            var role = this.context.Roles.Find(id);
            if (role != null)
            {
                this.context.Roles.Remove(role);
                this.context.Commit();
            }
        }

        /// <summary>Delete user</summary>
        /// <param name="id">User ID</param>
        public void DeleteUser(int id)
        {
            var user = this.GetUserById(id);

            // Admin can't be deleted. (User can't be set as admin using Web UI)
            if (user == null || user.IsAdmin)
            {
                return;
            }

            this.DeleteAllUserSecurityTickets(id);
            (Membership.Provider as SimpleMembershipProvider).DeleteAccount(user.Name);
            (Membership.Provider as SimpleMembershipProvider).DeleteUser(user.Name, true);
        }

        /// <summary>
        /// Get list of all groups
        /// </summary>
        /// <returns>List of groups</returns>
        public IQueryable<Group> GetAllGroups()
        {
            return this.context.Groups;
        }

        /// <summary>
        /// Get list of all permissions
        /// </summary>
        /// <returns>list of permissions</returns>
        /// <seealso ref="AuthController.GetPermissions"/>
        public IQueryable<Permission> GetAllPermissions()
        {
            return this.context.Permissions;
        }

        /// <summary>
        /// Get list of all roles
        /// </summary>
        /// <returns>List of roles</returns>
        public IQueryable<Role> GetAllRoles()
        {
            return this.context.Roles;
        }

        /// <summary>
        /// Get list of users
        /// </summary>
        /// <returns>list of users</returns>
        public IQueryable<User> GetAllUsers()
        {
            return this.context.Users;
        }

        /// <summary>
        /// Get list of current user permissions
        /// </summary>
        /// <returns>List of permissions</returns>
        public List<AssignedPermission> GetEffectivePermissions()
        {
            return this.GetEffectivePermissions(this.currentUser.Id);
        }

        /// <summary>
        /// Get list of selected user permissions
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>List of permissions</returns>
        public List<AssignedPermission> GetEffectivePermissions(int id)
        {
            var user = this.GetUserById(id);

            if (user == null)
            {
                return new List<AssignedPermission>();
            }

            // Admin has all permissions
            if (user.IsAdmin)
            {
                return this.context.Permissions.ToList()
                    .Select(it => new AssignedPermission { LinkedPermission = it }).ToList();
            }

            return user.Permissions
                .Union(user.Roles.SelectMany(r => r.Permissions))
                .Union(user.Groups.SelectMany(g => g.Permissions))
                .Union(user.Groups.SelectMany(g => g.Roles.SelectMany(r => r.Permissions)))
                .Distinct().ToList();
        }

        /// <summary>Get group by id</summary>
        /// <param name="id">Group ID</param>
        /// <returns>Group</returns>
        public Group GetGroupById(int id)
        {
            return this.context.Groups.Find(id);
        }

        /// <summary>Get single permission by code</summary>
        /// <param name="code">Permission code</param>
        /// <returns>Permission</returns>
        public Permission GetPermissionByCode(string code)
        {
            Debug.Assert(!string.IsNullOrEmpty(code), "Permission code should not be empty");

            return this.context.Permissions.FirstOrDefault(p => p.Code == code);
        }

        /// <summary>Get single permisison by given id</summary>
        /// <param name="id">permission id</param>
        /// <returns>permission</returns>
        public Permission GetPermissionById(int id)
        {
            Debug.Assert(id > 0, "Permission ID should be greater than 0");
            if (id < 1)
            {
                throw new ArgumentException("ID should be greater than zero", "id");
            }

            return this.context.Permissions.Find(id);
        }

        /// <summary>Get role by id</summary>
        /// <param name="id">Role ID</param>
        /// <returns>Role</returns>
        public Role GetRoleById(int id)
        {
            return this.context.Roles.Find(id);
        }

        /// <summary>Get single user by given id</summary>
        /// <param name="id">id</param>
        /// <returns>user</returns>
        public User GetUserById(int id)
        {
            Debug.Assert(id > 0, "User ID should be greater than 0");

            return this.context.Users.Find(id);
        }

        /// <summary>Get user by login name</summary>
        /// <param name="name">name of user</param>
        /// <returns>user</returns>
        public User GetUserByName(string name)
        {
            ////Debug.Assert(!string.IsNullOrEmpty(name), "Permission name should not be empty");
            return this.context.Users.FirstOrDefault(u => u.Name == name);
        }

        /// <summary>
        /// Get ID of current user
        /// </summary>
        /// <returns>User ID</returns>
        public int GetCurrentUserId()
        {
            return this.currentUser == null ? 0 : this.currentUser.Id;
        }

        /// <summary>
        /// Get current user
        /// </summary>
        /// <returns>User</returns>
        public User GetCurrentUser()
        {
            return this.currentUser;
        }

        /// <summary>Check current user permission</summary>
        /// <param name="permissionCode">Permission code</param>
        /// <returns>true if user has permission</returns>
        public bool HasPermission(string permissionCode)
        {
            if (this.currentUser == null)
            {
                return false;
            }

            return this.HasPermission(this.currentUser.Id, permissionCode);
        }

        /// <summary>Check if user has permission</summary>
        /// <param name="userId">User Id</param>
        /// <param name="permissionCode">Permission code</param>
        /// <returns>true if user has permission</returns>
        public bool HasPermission(int userId, string permissionCode)
        {
            var user = this.GetUserById(userId);
            return (user != null && user.IsAdmin)
                   || this.GetEffectivePermissions(userId).Any(p => p.LinkedPermission.Code == permissionCode);
        }

        /// <summary>Update group</summary>
        /// <param name="id">Group ID</param>
        /// <param name="updateStrategy">function to update group</param>
        public void UpdateGroup(int id, Action<Group> updateStrategy)
        {
            var db = this.context.Groups.Find(id);
            if (db != null)
            {
                updateStrategy(db);
                this.context.Commit();
            }
        }

        /// <summary>Update permission</summary>
        /// <param name="id">permission id</param>
        /// <param name="updateStrategy">function which updates connected DB object</param>
        public void UpdatePermission(int id, Action<Permission> updateStrategy)
        {
            Debug.Assert(id > 0, "Permission to update should have valid identity");
            Debug.Assert(updateStrategy != null, "Permition can't be updated without updateStrategy defined");

            var db = this.context.Permissions.FirstOrDefault(p => p.Id == id);
            if (db != null)
            {
                updateStrategy(db);
                this.context.Commit();
            }
        }

        /// <summary>Update role</summary>
        /// <param name="id">role ID</param>
        /// <param name="updateStrategy">function to update database role</param>
        public void UpdateRole(int id, Action<Role> updateStrategy)
        {
            var db = this.context.Roles.Find(id);
            if (db != null)
            {
                updateStrategy(db);
                this.context.Commit();
            }
        }

        /// <summary>Update user</summary>
        /// <param name="id">user id</param>
        /// <param name="updateStrategy">function which updates connected DB object</param>
        public void UpdateUser(int id, Action<User> updateStrategy)
        {
            Debug.Assert(id > 0, "User to update should have valid identity");
            Debug.Assert(updateStrategy != null, "User can't be updated without updateStrategy defined");

            var db = this.context.Users.Find(id);
            updateStrategy(db);

            this.context.Commit();
        }

        /// <summary>
        /// Get all companies
        /// </summary>
        /// <returns>List of companies</returns>
        public IQueryable<Company> GetAllCompanies()
        {
            return this.context.Companies;
        }

        /// <summary>
        /// Update company
        /// </summary>
        /// <param name="id">company id</param>
        /// <param name="updateStrategy">function which updates connected DB object</param>
        public void UpdateCompany(int id, Action<Company> updateStrategy)
        {
            var db = this.context.Companies.FirstOrDefault(p => p.Id == id);
            if (db != null)
            {
                updateStrategy(db);
                this.context.Commit();
            }
        }

        /// <summary>
        /// Get company by id
        /// </summary>
        /// <param name="id">company id</param>
        /// <returns>company</returns>
        public Company GetCompanyById(int id)
        {
            return this.context.Companies.Find(id);
        }

        /// <summary>
        /// Delete company
        /// </summary>
        /// <param name="id">company id</param>
        public void DeleteCompany(int id)
        {
            var company = this.context.Companies.Find(id);
            if (company != null)
            {
                this.context.Companies.Remove(company);
                this.context.Commit();
            }
        }

        /// <summary>
        /// create company
        /// </summary>
        /// <param name="company">company id</param>
        public void CreateCompany(Company company)
        {
            this.context.Companies.Add(company);
            this.context.Commit();
        }

        /// <summary>
        /// Get list of parameter values for given permission
        /// </summary>
        /// <param name="id">Permissions ID</param>
        /// <returns>List of parameter values</returns>
        public IList<KeyValuePair<int, string>> GetParameterValues(int id)
        {
            var permission = this.GetPermissionById(id);
            var result = new List<KeyValuePair<int, string>>();
            
            if (permission != null && !string.IsNullOrEmpty(permission.SQL))
            {
                var command = this.context.Connection.CreateCommand();
                command.CommandText = permission.SQL;
                
                if (this.context.Connection.State != ConnectionState.Open)
                {
                    this.context.Connection.Open();
                }

                var data = command.ExecuteReader();
                if (data.FieldCount == 2 && data.GetFieldType(0) == typeof(int)
                    && data.GetFieldType(1) == typeof(string))
                {
                    var limit = 0;
                    while (data.Read() && limit < 250)
                    {
                        result.Add(new KeyValuePair<int, string>(data.GetInt32(0), data.GetString(1)));
                        limit++;
                    }
                }
            }

            return result;
        }

        /// <summary>
        /// Get user settings
        /// </summary>
        /// <param name="id">User id</param>
        /// <returns>User settings</returns>
        public UserSettings GetUserSettings(int id)
        {
            return this.context.UserSettings.Find(id);
        }
     
        /// <summary>
        /// Delete all security tickets for user
        /// </summary>
        /// <param name="id">User id</param>
        public void DeleteAllUserSecurityTickets(int id)
        {
            var user = this.GetUserById(id);
            if (user == null)
            {
                return;
            }

            foreach (var ticket in this.context.UserSecurityTickets)
            {
                this.context.UserSecurityTickets.Remove(ticket);
            }

            this.context.Commit();
        }
    }
}