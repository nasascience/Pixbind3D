namespace BBWT.Web.OData
{
    using System.Linq;
    using System.Web.Http.OData;

    using AutoMapper.QueryableExtensions;

    using BBWT.DTO.Membership;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Groups collection OData controller
    /// </summary>
    public class GroupsODataController : ODataController
    {
        private IMembershipService membershipService;

        /// <summary>
        /// Constructs new instance of <see cref="GroupsODataController"/>
        /// </summary>
        /// <param name="membershipService">Membership service instance</param>
        public GroupsODataController(IMembershipService membershipService)
        {
            this.membershipService = membershipService;
        }

        /// <summary>
        /// Get list of Groups
        /// </summary>
        /// <returns>List of Groups</returns>
        public IQueryable<GroupsListItemDTO> Get()
        {
            return this.membershipService.GetAllGroups().Project().To<GroupsListItemDTO>();
        }
    }
}