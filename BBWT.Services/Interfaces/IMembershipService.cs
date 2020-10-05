namespace BBWT.Services.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using BBWT.Data.Membership;

    /// <summary>
    /// Membership Service interface
    /// </summary>
    public interface IMembershipService
    {
        /// <summary>Create Group</summary>
        /// <param name="group">Group</param>
        void CreateGroup(Group group);

        /// <summary>Create permission</summary>
        /// <param name="permission">Permission to create</param>
        void CreatePermission(Permission permission);

        /// <summary>Create role</summary>
        /// <param name="role">Role</param>
        void CreateRole(Role role);

        /// <summary>Create user</summary>
        /// <param name="user">user to create</param>
        /// <param name="password">optional password</param>
        /// <remarks>If password is empty new one will be generated automatically</remarks>
        void CreateUser(User user, string password = "");

        /// <summary>delete Group</summary>
        /// <param name="id">Group ID</param>
        void DeleteGroup(int id);

        /// <summary>delete permission by id</summary>
        /// <param name="id">permission id</param>
        void DeletePermission(int id);

        /// <summary>delete role</summary>
        /// <param name="id">Role ID</param>
        void DeleteRole(int id);

        /// <summary>Delete User</summary>
        /// <param name="id">User ID</param>
        void DeleteUser(int id);

        /// <summary>
        /// Get all Groups
        /// </summary>
        /// <returns>List of Groups</returns>
        IQueryable<Group> GetAllGroups();

        /// <summary>
        /// Get list of all permissions
        /// </summary>
        /// <returns>list of permissions</returns>
        /// <seealso ref="AuthController.GetPermissions"/>
        IQueryable<Permission> GetAllPermissions();

        /// <summary>
        /// Get all roles
        /// </summary>
        /// <returns>List of roles</returns>
        IQueryable<Role> GetAllRoles();

        /// <summary>
        /// Get list of users
        /// </summary>
        /// <returns>list of users</returns>
        IQueryable<User> GetAllUsers();

        /// <summary>
        /// Get list of current user effective permissions
        /// </summary>
        /// <returns>List of permissions</returns>
        List<AssignedPermission> GetEffectivePermissions();

        /// <summary>
        /// Get list of selected user effective permissions
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>List of permissions</returns>
        List<AssignedPermission> GetEffectivePermissions(int id);

        /// <summary>Get Group</summary>
        /// <param name="id">Group id</param>
        /// <returns>Group</returns>
        Group GetGroupById(int id);

        /// <summary>Get single permisison by given id</summary>
        /// <param name="id">permission id</param>
        /// <returns>permission</returns>
        Permission GetPermissionById(int id);

        /// <summary>Get role</summary>
        /// <param name="id">role id</param>
        /// <returns>Role</returns>
        Role GetRoleById(int id);

        /// <summary>Get single user by given id</summary>
        /// <param name="id">id</param>
        /// <returns>user</returns>
        User GetUserById(int id);

        /// <summary>Get user by login name</summary>
        /// <param name="name">name of user</param>
        /// <returns>user</returns>
        User GetUserByName(string name);

        /// <summary>
        /// Get ID of current user
        /// </summary>
        /// <returns>current user id</returns>
        int GetCurrentUserId();

        /// <summary>
        /// Get current user
        /// </summary>
        /// <returns>current user</returns>
        User GetCurrentUser();

        /// <summary>Update Group</summary>
        /// <param name="id">Group ID</param>
        /// <param name="updateStrategy">function to update group</param>
        void UpdateGroup(int id, Action<Group> updateStrategy);

        /// <summary>Update permission</summary>
        /// <param name="id">permission id</param>
        /// <param name="updateStrategy">function which updates connected DB object</param>
        void UpdatePermission(int id, Action<Permission> updateStrategy);

        /// <summary>Update role</summary>
        /// <param name="id">Role ID</param>
        /// <param name="updateStrategy">Function to update DB record</param>
        void UpdateRole(int id, Action<Role> updateStrategy);

        /// <summary>Update user</summary>
        /// <param name="id">user id</param>
        /// <param name="updateStrategy">function which updates connected DB object</param>
        void UpdateUser(int id, Action<User> updateStrategy);

        /// <summary>
        /// Get all companies
        /// </summary>
        /// <returns>List of companies</returns>
        IQueryable<Company> GetAllCompanies();

        /// <summary>Update company</summary>
        /// <param name="id">Company ID</param>
        /// <param name="updateStrategy">Function to update DB record</param>
        void UpdateCompany(int id, Action<Company> updateStrategy);

        /// <summary>Get single company by given id</summary>
        /// <param name="id">id</param>
        /// <returns>company</returns>
        Company GetCompanyById(int id);

        /// <summary>delete company</summary>
        /// <param name="id">Company ID</param>
        void DeleteCompany(int id);

        /// <summary>Create company</summary>
        /// <param name="company">Company</param>
        void CreateCompany(Company company);

        /// <summary>
        /// Get list of parameter values
        /// </summary>
        /// <param name="id">Permission Code</param>
        /// <returns>List of values</returns>
        IList<KeyValuePair<int, string>> GetParameterValues(int id);

        /// <summary>
        /// Get user settings
        /// </summary>
        /// <param name="id">user id</param>
        /// <returns>user settings</returns>
        UserSettings GetUserSettings(int id);        

        /// <summary>
        /// Delete all security tickets for user
        /// </summary>
        /// <param name="id">user id</param>
        void DeleteAllUserSecurityTickets(int id);

        /// <summary>
        /// Find permission by code
        /// </summary>
        /// <param name="code">Code</param>
        /// <returns>Permission</returns>
        Permission GetPermissionByCode(string code);
    }
}
