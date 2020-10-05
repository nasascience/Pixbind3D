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
    /// API controller to work on groups collection
    /// </summary>
    public class GroupsController : ApiController
    {
        private readonly IMappingEngine mapper;
        private readonly IMembershipService membershipService;

        /// <summary>
        /// Constructs new instance of <see cref="GroupsController"/>
        /// </summary>
        /// <param name="membershipService">membership service instance</param>
        /// <param name="mapper">Mapper instance</param>
        public GroupsController(IMembershipService membershipService, IMappingEngine mapper)
        {
            this.membershipService = membershipService;
            this.mapper = mapper;
        }

        /// <summary>Delete Group by id</summary>
        /// <param name="id">Group id</param>
        [HttpGet]
        public void DeleteGroup(int id)
        {
            this.membershipService.DeleteGroup(id);
        }

        /// <summary>
        /// Get list of Groups
        /// </summary>
        /// <returns>List of Groups</returns>
        [HttpGet]
        public IQueryable<GroupsListItemDTO> GetAllGroups()
        {
            return this.membershipService.GetAllGroups().Project().To<GroupsListItemDTO>();
        }

        /// <summary>Get single Group by id</summary>
        /// <param name="id">Group id</param>
        /// <returns>Group</returns>
        [HttpGet]
        public GroupDTO GetGroupById(int id)
        {
            var grp = this.membershipService.GetGroupById(id);
            var groupDTO = this.mapper.Map<GroupDTO>(grp);

            var permissionsDTO = this.membershipService.GetAllPermissions().Project().To<CheckBoxItemDTO>().ToList();
            permissionsDTO.ForEach(it => it.IsChecked = grp.Permissions.Any(p => p.LinkedPermission.Id == it.Id));

            var rolesDTO = this.membershipService.GetAllRoles().Project().To<CheckBoxItemDTO>().ToList();
            rolesDTO.ForEach(it => it.IsChecked = grp.Roles.Any(p => p.Id == it.Id));

            groupDTO.Permissions = permissionsDTO;
            groupDTO.Roles = rolesDTO;

            return groupDTO;
        }

        /// <summary>Create or update Group</summary>
        /// <param name="dto">Group DTO</param>
        [HttpPost]
        public void SaveGroup(GroupDTO dto)
        {
            if (dto.Id == 0)
            {
                var grp = this.mapper.Map<Group>(dto);

                grp.Permissions = new List<AssignedPermission>();
                grp.Roles = new List<Role>();

                this.UpdatePermissionsCollection(grp.Permissions, dto.Permissions);
                this.UpdateRolesCollection(grp.Roles, dto.Roles);

                this.membershipService.CreateGroup(grp);
            }
            else
            {
                this.membershipService.UpdateGroup(
                    dto.Id,
                    grp =>
                    {
                        this.mapper.Map(dto, grp);

                        this.UpdateRolesCollection(grp.Roles, dto.Roles);
                        this.UpdatePermissionsCollection(grp.Permissions, dto.Permissions);
                    });
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

        private void UpdateRolesCollection(ICollection<Role> roles, IList<CheckBoxItemDTO> dtos)
        {
            if (roles == null || dtos == null)
            {
                return;
            }

            foreach (var role in dtos)
            {
                var item = roles.FirstOrDefault(p => p.Id == role.Id);

                if (role.IsChecked)
                {
                    if (item == null)
                    {
                        roles.Add(this.membershipService.GetRoleById(role.Id));
                    }
                }
                else
                {
                    if (item != null)
                    {
                        roles.Remove(item);
                    }
                }
            }
        }
    }
}