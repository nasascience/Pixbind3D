namespace BBWT.Web.OData
{
    using System.Linq;
    using System.Web.Http.OData;

    using AutoMapper.QueryableExtensions;

    using BBWT.DTO.Membership;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Companies collection OData controller
    /// </summary>
    public class CompaniesODataController : ODataController
    {
        private readonly IMembershipService membershipService;

        /// <summary>
        /// Constructs new instance of <see cref="GroupsODataController"/>
        /// </summary>
        /// <param name="membershipService">Membership service instance</param>
        public CompaniesODataController(IMembershipService membershipService)
        {
            this.membershipService = membershipService;
        }

        /// <summary>
        /// Get list of Groups
        /// </summary>
        /// <returns>List of Groups</returns>
        public IQueryable<CompanyListItemDTO> Get()
        {
            return this.membershipService.GetAllCompanies().Project().To<CompanyListItemDTO>();
        }
    }
}