namespace BBWT.Services.Classes
{
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Web;

    using Interfaces;
    using Microsoft.Reporting.WebForms.Internal.Soap.ReportingServices2005.Execution;
    using Microsoft.SqlServer.ReportingServices2010;

    using SSRS.Models;
    using ParameterValue = Microsoft.Reporting.WebForms.Internal.Soap.ReportingServices2005.Execution.ParameterValue;

    /// <summary>
    /// ISsrsProvider interface implementation
    /// </summary>
    public class SsrsProvider : ISsrsProvider
    {
        private readonly ISsrsWrapperProvider ssrsWrapperProvider = null;

        /// <summary>
        /// Custom constructor
        /// </summary>
        /// <param name="ssrsWrapperProvider">Injected SsrsWrapperProvider</param>
        public SsrsProvider(ISsrsWrapperProvider ssrsWrapperProvider)
        {
            this.ssrsWrapperProvider = ssrsWrapperProvider;
        }

        /// <summary>
        /// Returns list of available SSRS reports
        /// </summary>
        /// <returns>List of CatalogItems (Reports)</returns>
        public IQueryable<SsrsReport> GetReports()
        {
            var ssrs = this.ssrsWrapperProvider.GetReportingServiceWrapper();
            var searchOptions = new Property[1];
            var searchOption = new Property { Name = "Recursive", Value = "True" };

            searchOptions[0] = searchOption;
            var ssrsObjects = ssrs.FindItems("/", BooleanOperatorEnum.Or, searchOptions, new SearchCondition[0]);

            if (ssrsObjects != null)
            {
                return ssrsObjects.Where(o => o.TypeName == "Report").Select(o => new SsrsReport()
                    {
                        Id = o.ID,
                        ReportName = o.Name,
                        Description = o.Description,
                        ReportPath = o.Path
                    }).AsQueryable();
            }

            return null;
        }

        /// <summary>
        /// Returns SSRS report info
        /// </summary>
        /// <param name="name">Report Name</param>
        /// <returns>SSRS Report info</returns>
        public IQueryable<SsrsReport> GetReportInfo(string name)
        {
            var ssrs = this.ssrsWrapperProvider.GetReportingServiceWrapper();
            var searchOptions = new Property[1];
            var searchOption = new Property { Name = "Recursive", Value = "True" };
            searchOptions[0] = searchOption;

            var searchConditions = new SearchCondition[1];
            var searchCondition = new SearchCondition();
            searchCondition.Name = "Name";
            searchCondition.Values = new[] { HttpUtility.UrlDecode(name) };
            searchCondition.Condition = ConditionEnum.Equals;
            searchCondition.ConditionSpecified = true;
            searchConditions[0] = searchCondition;

            var ssrsObjects = ssrs.FindItems("/", BooleanOperatorEnum.Or, searchOptions, searchConditions);

            if (ssrsObjects != null)
            {
                return ssrsObjects.Where(o => o.TypeName == "Report")
                        .Select(o => new SsrsReport()
                                {
                                    Id = o.ID,
                                    ReportName = o.Name,
                                    Description = o.Description,
                                    ReportPath = o.Path
                                }).AsQueryable();
            }

            return null;
        }

        /// <summary>
        /// Returns SSRS report info
        /// </summary>
        /// <param name="id">Report Id</param>
        /// <returns>SSRS Report info</returns>
        public IQueryable<SsrsReport> GetReportInfoById(string id)
        {
           return this.GetReports().Where(r => r.Id.ToLower() == id.ToLower()).AsQueryable();
        }

        /// <summary>
        /// Returns list of report's parameters
        /// </summary>
        /// <param name="itemPath">Path to the report</param>
        /// <returns>List of parameters</returns>
        public IQueryable<SsrsParameter> GetReportParameters(string itemPath)
        {
            var ssrs = this.ssrsWrapperProvider.GetReportingServiceWrapper();
            var parameters = ssrs.GetItemParameters(itemPath, null, true, null, null).ToList();

            var rp = parameters.Count == 0
                       ? null
                       : parameters.ToList()
                             .Select(p => new SsrsParameter()
                                     {
                                         Name = p.Name,
                                         Prompt = p.Prompt,
                                         Value = p.ValidValues == null ? string.Empty : p.ValidValues.First().Value,
                                         IsHidden = string.IsNullOrEmpty(p.Prompt),
                                         ValidValues = p.ValidValues == null ? new List<SsrsParameterValues>() : p.ValidValues.Select(v => new SsrsParameterValues()
                                                     {
                                                         Label = v.Label,
                                                         Value = v.Value
                                                     }).ToList()
                                                     
                                    })
                             .AsQueryable();

            return rp;
        }

        /// <summary>
        /// Executes report and returns file
        /// </summary>
        /// <param name="path">Path to report</param>
        /// <param name="format">Format</param>
        /// <param name="parameters">List of parameters</param>
        /// <returns>Array of bytes</returns>
        public byte[] ExportReport(string path, string format, List<SsrsParameter> parameters)
        {
            string reportPath = path;
            string historyID = null;
            string devInfo = @"<DeviceInfo><Toolbar>Full</Toolbar></DeviceInfo>";
            string encoding;
            string mimeType;
            string extension;
            Microsoft.Reporting.WebForms.Internal.Soap.ReportingServices2005.Execution.Warning[] warnings = null;
            string[] streamIDs = null;

            ReportExecutionService res = new ReportExecutionService();
            res.Url = ConfigurationManager.AppSettings["ReportingServiceExecutionUrl"];
            res.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["ReportingServiceLogin"],
                                                                   ConfigurationManager.AppSettings["ReportingServicePassword"],
                                                                   ConfigurationManager.AppSettings["ReportingServiceDomain"]);

            ExecutionInfo execInfo = new ExecutionInfo();
            ExecutionHeader execHeader = new ExecutionHeader();
            res.ExecutionHeaderValue = execHeader;
            execInfo = res.LoadReport(reportPath, historyID);
            if (parameters.Count > 0)
            {
                ParameterValue[] plist = new ParameterValue[parameters.Count];

                for (var i = 0; i < parameters.Count; i++)
                {
                    plist[i] = new ParameterValue
                        {
                            Name = parameters[i].Name,
                            Value = parameters[i].Value
                        };
                    i++;
                }

                res.SetExecutionParameters(plist, "en-us");
            }

            return res.Render(format, devInfo, out extension, out encoding, out mimeType, out warnings, out streamIDs);
        }

        /// <summary>
        /// Returns list of the file extensions
        /// </summary>
        /// <param name="format">Format</param>
        /// <returns>Extension string representation</returns>
        public string GetExtension(string format)
        {
            switch (format)
            {
                case "PDF":
                    return "pdf";
                case "EXCEL":
                    return "xls";
                case "Word":
                    return "doc";
                case "XML":
                    return "xml";
                case "CSV":
                    return "csv";
                case "IMAGE":
                    return "tiff";
                case "HTML4.0":
                    return "html";
                case "MHTML":
                    return "mhtml";
            }

            return ".non";
        }

        /// <summary>
        /// Returns list of fields from T-SQL query
        /// </summary>
        /// <param name="database">Database name</param>
        /// <param name="query">T-SQL query</param>
        /// <returns>List of fields from T-SQL query</returns>
        public List<Microsoft.ReportingServices.RdlObjectModel.Field> GetFieldsFromQuery(string database, string query)
        {
            List<Microsoft.ReportingServices.RdlObjectModel.Field> result;
            SqlCommand command;
            SqlDataReader reader;
            using (var connection = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                connection.Open();
                connection.ChangeDatabase(database);
                command = connection.CreateCommand();
                command.CommandText = query;
                
                reader = command.ExecuteReader(CommandBehavior.SchemaOnly);

                result = new List<Microsoft.ReportingServices.RdlObjectModel.Field>();
                for (int i = 0; i <= reader.FieldCount - 1; i++)
                {
                    result.Add(new Microsoft.ReportingServices.RdlObjectModel.Field()
                            {
                                Name = reader.GetName(i),
                                TypeName = reader.GetDataTypeName(i),
                                Caption = reader.GetName(i),
                                Value = null,
                                DataField = reader.GetName(i)
                            });
                }

                return result;
            }
        }
    }
}
