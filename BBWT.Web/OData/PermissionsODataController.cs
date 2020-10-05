namespace BBWT.Web.OData
{
    using System.Linq;
    using System.Web.Http;
    using System.Web.Http.OData;

    using AutoMapper.QueryableExtensions;

    using BBWT.DTO.Membership;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Permissions controller
    /// </summary>
    public class PermissionsODataController : ODataController
    {
        private readonly IMembershipService service;

        /// <summary>Constructs permissions controller class</summary>
        /// <param name="svc">Membership service injection</param>
        public PermissionsODataController(IMembershipService svc)
        {
            this.service = svc;
        }

        /// <summary>
        /// Get list of permissions
        /// </summary>
        /// <returns>List of permissions</returns>
        [HttpGet]
        public IQueryable<PermissionDTO> Get()
        {
            return this.service.GetAllPermissions().Project().To<PermissionDTO>();
        }
    }
}