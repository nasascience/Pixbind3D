namespace BBWT.Web.OData
{
    using System.Linq;
    using System.Web.Http.OData;

    using AutoMapper.QueryableExtensions;

    using BBWT.DTO.Content;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Custom Content OData controller
    /// </summary>
    public class CustomContentODataController : ODataController
    {
        private readonly ICustomContentService service;

        /// <summary>
        /// Creates Custom Content OData controller instance
        /// </summary>
        /// <param name="svc">Service instance</param>
        public CustomContentODataController(ICustomContentService svc)
        {
            this.service = svc;
        }

        /// <summary>
        /// Get list of Groups
        /// </summary>
        /// <returns>List of Groups</returns>
        public IQueryable<CustomContentDTO> Get()
        {
            return this.service.GetAllContents().Project().To<CustomContentDTO>();
        }
    }
}