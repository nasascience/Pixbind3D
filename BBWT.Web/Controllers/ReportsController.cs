namespace BBWT.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Script.Serialization;

    using BBWT.Data.Reports;
    using BBWT.DTO.Reports;
    using BBWT.Services.Interfaces;
    using BBWT.SSRS.Models;

    /// <summary>
    /// Reports controller
    /// </summary>
    public class ReportsController : Controller
    {
        private readonly ISsrsProvider ssrsProvider;
        private readonly ISsrsService ssrsService;
        
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="ssrsProvider">SSRS Provider</param>
        /// <param name="ssrsService">SSRS Service</param>
        public ReportsController(ISsrsProvider ssrsProvider, ISsrsService ssrsService)
        {
            this.ssrsProvider = ssrsProvider;
            this.ssrsService = ssrsService;
        }

        /// <summary>
        /// Viewer action
        /// </summary>
        /// <param name="executionParameters">ExecutionParameters</param>
        /// <returns>Action result</returns>
        public ActionResult Viewer(string executionParameters)
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            var r = ser.Deserialize<ExecuteReportDTO>(executionParameters);

            ViewBag.Path = r.Path;
            if (r.Parameters != null && r.Parameters.Any())
            {
                ViewBag.Parameters = r.Parameters.Select(p => new KeyValuePair<string, object>(p.Name, p.Value));
            }
            else
            {
                ViewBag.Parameters = null;
            }

            return this.View();
        }

        /// <summary>
        /// Export report
        /// </summary>
        /// <param name="path">Path to SSRS report</param>
        /// <param name="exportFormat">Export format</param>
        /// <param name="parameters">List of parameters</param>
        /// <returns>FileResult</returns>
        public FileResult Export(string path, string exportFormat, List<ParameterDTO> parameters)
        {
            List<SsrsParameter> p = null;
            foreach (var parameterDto in parameters)
            {
                if (p == null)
                {
                    p = new List<SsrsParameter>();
                }

                p.Add(new SsrsParameter()
                          {
                              Value = parameterDto.Value,
                              Name = parameterDto.Name
                          });
            }

            var bytes = this.ssrsProvider.ExportReport(path, exportFormat, p);
            var contentType = System.Net.Mime.MediaTypeNames.Application.Octet;
            if (exportFormat == "PDF")
            {
                contentType = System.Net.Mime.MediaTypeNames.Application.Pdf;
            }

            var pathParts = path.Split('/');
            var name = string.Format(
                "{0}_{1}.{2}",
                pathParts[pathParts.Length > 0 ? pathParts.Length - 1 : 0],
                DateTime.Now.ToFileTime(),
                this.ssrsProvider.GetExtension(exportFormat));

            return this.File(bytes, contentType, name);
        }
    }
}