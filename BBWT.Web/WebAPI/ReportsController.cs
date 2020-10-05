namespace BBWT.Web.WebAPI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Web.Http;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using BBWT.Data.Reports;
    using BBWT.DTO.Reports;
    using BBWT.Services.Interfaces;
    using BBWT.SSRS.Models;
    
    /// <summary>
    /// Web API Reports Controller
    /// </summary>
    public class ReportsController : ApiController
    {
        private readonly ISsrsProvider ssrsProvider;
        private readonly ISsrsService ssrsService;
        private readonly IMappingEngine mapper;

        /// <summary>Constructs MenuController class</summary>
        /// <param name="ssrsProvider">Ssrs provider</param>
        /// <param name="ssrsService">Ssrs service</param>
        /// <param name="mapper">Mapper instance</param>
        public ReportsController(ISsrsProvider ssrsProvider, ISsrsService ssrsService, IMappingEngine mapper)
        {
            this.ssrsProvider = ssrsProvider;
            this.ssrsService = ssrsService;
            this.mapper = mapper;
        }

        /// <summary>
        /// Parameterless constructor
        /// </summary>
        public ReportsController()
        {
        }

        /// <summary>
        /// Get Report parameters
        /// </summary>
        /// <param name="reportPath">Path to Report</param>
        /// <returns>List of menu elements</returns>
        public IEnumerable<ParameterDTO> GetReportParameters(string reportPath)
        {
            var rawParams = this.ssrsProvider.GetReportParameters(reportPath);
            try
            {
                return rawParams == null || !rawParams.Any() ? null : rawParams.Project().To<ParameterDTO>();
            }
            catch (Exception exc)
            {
                return null;
            }
        }

        /// <summary>
        /// Get Report info
        /// </summary>
        /// <param name="name">Report name</param>
        /// <returns>List of menu elements</returns>
        public ReportDTO GetReportInfo(string name)
        {
            return this.ssrsProvider.GetReportInfo(name).Project().To<ReportDTO>().FirstOrDefault();
        }

        /// <summary>
        /// Get Report info
        /// </summary>
        /// <param name="id">Report Id</param>
        /// <returns>List of menu elements</returns>
        public ReportDTO GetReportInfoById(string id)
        {
            return this.ssrsProvider.GetReportInfoById(id).Project().To<ReportDTO>().FirstOrDefault();
        }
        
        /// <summary>
        /// Executes report and returns file
        /// </summary>
        /// <param name="dto">Object that describes Report execution parameters</param>
        /// <returns>Report execution result</returns>
        [HttpPost]
        public HttpResponseMessage Export(ExecuteReportDTO dto)
        {
            if (string.IsNullOrEmpty(dto.Path) || string.IsNullOrEmpty(dto.Format))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new ByteArrayContent(this.ssrsProvider.ExportReport(dto.Path, dto.Format, dto.Parameters.AsQueryable().Project().To<SsrsParameter>().ToList()));

            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = string.Format("{0}.{1}", "test", dto.Format);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");            

            return response;
        }

        /// <summary>
        /// Save report
        /// </summary>
        /// <param name="model">Save report request model</param>
        public void SaveReport(CreateReportModelDTO model)
        {
            CreateReportModel crm = new CreateReportModel()
            {
                ReportName = model.ReportName,
                ReportDescription = model.ReportDescription,
                Query = model.Query,
                DatabaseName = model.DatabaseName
            };

            this.ssrsService.CreateReport(crm);
        }
    }
}