namespace BBWT.Web.OData
{
    using System.Linq;
    using System.Web.Http.OData;
    using AutoMapper.QueryableExtensions;
    using BBWT.DTO.Reports;
    using Services.Interfaces;
   
    /// <summary>
    /// Reports OData controller
    /// </summary>
    public class ReportsODataController : ODataController
    {
        private ISsrsProvider provider;

        /// <summary>
        /// Constructs new instance of <see cref="ReportsODataController"/>
        /// </summary>
        /// <param name="provider">Ssrs provider instance</param>
        public ReportsODataController(ISsrsProvider provider)
        {
            this.provider = provider;
        }

        /// <summary>
        /// Get list of reports
        /// </summary>
        /// <returns>List of reports</returns>
        public IQueryable<ReportDTO> Get()
        {
            return this.provider.GetReports().Project().To<ReportDTO>();
        }
    }
}