namespace BBWT.Web.WebAPI
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using BBWT.Data.Membership;
    using BBWT.DTO;
    using BBWT.DTO.Membership;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Roles collection API controller
    /// </summary>
    public class RolesController : ApiController
    {
        private readonly IMappingEngine mapper;
        private readonly IMembershipService membershipService;

        /// <summary>
        /// Creates new instance of <see cref="RolesController"/>
        /// </summary>
        /// <param name="membershipService">Membership service instance</param>
        /// <param name="mapper">Mapper instance</param>
        public RolesController(IMembershipService membershipService, IMappingEngine mapper)
        {
            this.membershipService = membershipService;
            this.mapper = mapper;
        }

        /// <summary>Delete role by id</summary>
        /// <param name="id">role id</param>
        [HttpGet]
        public void DeleteRole(int id)
        {
            this.membershipService.DeleteRole(id);
        }

        /// <summary>
        /// Get list of roles
        /// </summary>
        /// <returns>List of roles</returns>
        [HttpGet]
        public IQueryable<RolesListItemDTO> GetAllRoles()
        {
            return this.membershipService.GetAllRoles().Project().To<RolesListItemDTO>();
        }

        /// <summary>Get single role by id</summary>
        /// <param name="id">role id</param>
        /// <returns>role</returns>
        [HttpGet]
        public RoleDTO GetRoleById(int id)
        {
            var role = this.membershipService.GetRoleById(id);
            var roleDTO = this.mapper.Map<RoleDTO>(role);

            var permissionsDTO = this.membershipService.GetAllPermissions().Project().To<CheckBoxItemDTO>().ToList();
            permissionsDTO.ForEach(it => it.IsChecked = role.Permissions.Any(p => p.LinkedPermission.Id == it.Id));

            var usersDTO = this.membershipService.GetAllUsers().Project().To<SelectedUserDTO>().ToList();
            var allUsers = this.membershipService.GetAllUsers().ToList();
            var checkedUsers = allUsers.Where(u => u.Roles.Any(r => r.Id == id)).Select(u => u.Name).ToList();
            usersDTO.ForEach(it => it.IsChecked = checkedUsers.Contains(it.Name));

            roleDTO.Permissions = permissionsDTO;
            roleDTO.Users = usersDTO;

            return roleDTO;
        }

        /// <summary>Create or update role</summary>
        /// <param name="dto">role DTO</param>
        [HttpPost]
        public void SaveRole(RoleDTO dto)
        {
            if (dto.Id == 0)
            {
                var role = this.mapper.Map<Role>(dto);
                this.UpdatePermissionsCollection(role.Permissions, dto.Permissions);
                this.membershipService.CreateRole(role);

                var selectedUsers = dto.Users.Where(u => u.IsChecked);
                foreach (var selectedUser in selectedUsers)
                {
                    var user = this.membershipService.GetUserByName(selectedUser.Name);
                    this.membershipService.UpdateUser(user.Id, usr => usr.Roles.Add(role));
                }
            }
            else
            {
                this.membershipService.UpdateRole(
                    dto.Id,
                    role =>
                    {
                        this.mapper.Map(dto, role);

                        this.UpdatePermissionsCollection(role.Permissions, dto.Permissions);
                        this.UpdateUsers(dto.Id, dto.Users);
                    });
            }
        }

        /// <summary>Get role permissions</summary>
        /// <returns>Role permission DTO</returns>
        [HttpPost]
        public IList<RolePermissionsDTO> GetRolePermissions()
        {
            var roles = this.membershipService.GetAllRoles();
            return roles.Select(role => new RolePermissionsDTO { Role = role.Name, Permissions = role.Permissions.Select(p => p.LinkedPermission.Code).ToList() }).ToList();
        }

        /// <summary>
        /// Update permission roles
        /// </summary>
        /// <param name="code">Permission code</param>
        /// <param name="roleNames">Roles list</param>
        [HttpPost]
        public void UpdatePermissionRoles(string code, [FromBody] IList<string> roleNames)
        {
            var permission = this.membershipService.GetPermissionByCode(code);
            var roles = this.membershipService.GetAllRoles();

            foreach (var role in roles)
            {
                if (roleNames.Contains(role.Name) && role.Permissions.All(p => p.LinkedPermission.Code != code))
                {
                    this.membershipService.UpdateRole(
                        role.Id, r => r.Permissions.Add(new AssignedPermission { LinkedPermission = permission }));
                }
                else if (!roleNames.Contains(role.Name) && role.Permissions.Any(p => p.LinkedPermission.Code == code))
                {
                    this.membershipService.UpdateRole(
                        role.Id,
                        r =>
                        {
                            var perm = r.Permissions.FirstOrDefault(p => p.LinkedPermission.Code == code);
                            r.Permissions.Remove(perm);
                        });
                }
            }
        }

        private void UpdateUsers(int roleId, IList<SelectedUserDTO> selectedUsers)
        {
            var usersList = this.membershipService.GetAllUsers();
            var role = this.membershipService.GetRoleById(roleId);

            foreach (var userDTO in selectedUsers)
            {
                var user = usersList.First(u => u.Name == userDTO.Name);
                var hasRole = user.Roles.Any(r => r.Id == roleId);

                if (hasRole && !userDTO.IsChecked)
                {
                    this.membershipService.UpdateUser(user.Id, usr => usr.Roles.Remove(role));
                }
                else if (!hasRole && userDTO.IsChecked)
                {
                    this.membershipService.UpdateUser(user.Id, usr => usr.Roles.Add(role));
                }
            }
        }

        private void UpdatePermissionsCollection(ICollection<AssignedPermission> permissions, IList<CheckBoxItemDTO> dtos)
        {
            if (permissions == null || dtos == null)
            {
                return;
            }

            foreach (var perm in dtos)
            {
                var item = permissions.FirstOrDefault(p => p.LinkedPermission.Id == perm.Id);

                if (perm.IsChecked)
                {
                    if (item == null)
                    {
                        permissions.Add(new AssignedPermission { LinkedPermission = this.membershipService.GetPermissionById(perm.Id) });
                    }
                }
                else
                {
                    if (item != null)
                    {
                        permissions.Remove(item);
                        item.LinkedPermission = null;
                    }
                }
            }
        }
    }
}