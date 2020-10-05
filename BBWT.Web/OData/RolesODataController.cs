namespace BBWT.Web.OData
{
    using System.Linq;
    using System.Web.Http.OData;

    using AutoMapper.QueryableExtensions;

    using BBWT.DTO.Membership;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Roles OData controller
    /// </summary>
    public class RolesODataController : ODataController
    {
        private IMembershipService membershipService;

        /// <summary>
        /// Constructs new instance of <see cref="RolesODataController"/>
        /// </summary>
        /// <param name="membershipService">Membership service instance</param>
        public RolesODataController(IMembershipService membershipService)
        {
            this.membershipService = membershipService;
        }

        /// <summary>
        /// Get list of roles
        /// </summary>
        /// <returns>List of roles</returns>
        public IQueryable<RolesListItemDTO> Get()
        {
            return this.membershipService.GetAllRoles().Project().To<RolesListItemDTO>();
        }
    }
}