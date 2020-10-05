namespace BBWT.Web.OData
{
    using System.Linq;
    using System.Web.Http.OData;

    using AutoMapper.QueryableExtensions;

    using BBWT.DTO.Membership;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// User management API controller
    /// </summary>
    public class UsersODataController : ODataController
    {
        private readonly IMembershipService service;

        /// <summary>Constructs users controller</summary>
        /// <param name="srv">data service injection</param>
        public UsersODataController(IMembershipService srv)
        {
            this.service = srv;
        }

        /// <summary>Get list of users</summary>
        /// <returns>Account DTO</returns>
        public IQueryable<AccountDTO> Get()
        {
            return this.service.GetAllUsers().Project().To<AccountDTO>();
        }
    }
}