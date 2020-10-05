namespace BBWT.Web.WebAPI
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using BBWT.Data.Membership;
    using BBWT.DTO.Membership;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Permissions controller
    /// </summary>
    public class PermissionsController : ApiController
    {
        private readonly IMembershipService service;

        private readonly IMappingEngine mapper;

        /// <summary>Constructs permissions controller class</summary>
        /// <param name="svc">Membership service injection</param>
        /// <param name="mapper">Mapper instance</param>
        public PermissionsController(IMembershipService svc, IMappingEngine mapper)
        {
            this.service = svc;
            this.mapper = mapper;
        }

        /// <summary>Delete permission by id</summary>
        /// <param name="id">permission id</param>
        [HttpGet]
        public void DeletePermission(int id)
        {
            this.service.DeletePermission(id);
        }

        /// <summary>
        /// Get list of permissions
        /// </summary>
        /// <returns>List of permissions</returns>
        [HttpGet]
        public IQueryable<PermissionDTO> GetAllPermissions()
        {
            return this.service.GetAllPermissions().Project().To<PermissionDTO>();
        }

        /// <summary>Get single permission by id</summary>
        /// <param name="id">permission id</param>
        /// <returns>permission</returns>
        [HttpGet]
        public PermissionDTO GetPermissionById(int id)
        {
            var permission = this.service.GetPermissionById(id);
            return this.mapper.Map<PermissionDetailsDTO>(permission);
        }

        /// <summary>Create or update permission</summary>
        /// <param name="dto">Permission DTO</param>
        [HttpPost]
        public void SavePermission(PermissionDetailsDTO dto)
        {
            if (dto.Id == 0)
            {
                this.service.CreatePermission(this.mapper.Map<Permission>(dto));
            }
            else
            {
                this.service.UpdatePermission(dto.Id, (permission) => this.mapper.Map(dto, permission));
            }
        }

        /// <summary>Get list of parameter values</summary>
        /// <param name="id">Parameter ID</param>
        /// <returns>List of values</returns>
        [HttpPost]
        public IList<KeyValuePair<int, string>> GetParameterValues(int id)
        {
            return this.service.GetParameterValues(id)
                .Select(it => new KeyValuePair<int, string>(it.Key, it.Value))
                .ToList();
        }
    }
}