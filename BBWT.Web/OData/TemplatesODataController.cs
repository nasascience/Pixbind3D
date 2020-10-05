namespace BBWT.Web.OData
{
    using System.Linq;
    using System.Web.Http.OData;

    using AutoMapper.QueryableExtensions;

    using BBWT.DTO.Template;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Templates management API controller
    /// </summary>
    public class TemplatesODataController : ODataController
    {
        private readonly IEmailTemplateService service;

        /// <summary>Constructs users controller</summary>
        /// <param name="srv">data service injection</param>
        public TemplatesODataController(IEmailTemplateService srv)
        {
            this.service = srv;
        }

        /// <summary>Get list of users</summary>
        /// <returns>Account DTO</returns>
        public IQueryable<EmailTemplateDTO> Get()
        {
            return this.service.GetAllTemplates().Project().To<EmailTemplateDTO>();
        }
    }
}