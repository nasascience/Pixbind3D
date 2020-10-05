namespace BBWT.Services.Classes
{
    using System.Configuration;
    using System.IO;
    using BBWT.Data.Reports;
    using BBWT.Services.Interfaces;
    using BBWT.SSRS;
    using Microsoft.ReportingServices.RdlObjectModel;
    using Microsoft.SqlServer.ReportingServices2010;

    using DataSource = Microsoft.ReportingServices.RdlObjectModel.DataSource;

    /// <summary>
    /// Ssrs service
    /// </summary>
    public class SsrsService : ISsrsService
    {
         private readonly ISsrsWrapperProvider ssrsWrapperProvider = null;
         private readonly ISsrsProvider ssrsProvider = null;

        /// <summary>
        /// Custom constructor
        /// </summary>
        /// <param name="ssrsWrapperProvider">Injected SsrsWrapperProvider</param>
        /// <param name="ssrsProvider">Injected SsrsProvider</param>
        public SsrsService(ISsrsWrapperProvider ssrsWrapperProvider, ISsrsProvider ssrsProvider)
        {
            this.ssrsWrapperProvider = ssrsWrapperProvider;
            this.ssrsProvider = ssrsProvider;
        }

        /// <summary>
        /// Create report
        /// </summary>
        /// <param name="model">Create report model</param>
        public void CreateReport(CreateReportModel model)
        {
            var ssrs = this.ssrsWrapperProvider.GetReportingServiceWrapper();
            Warning[] warnings;
            
            Report report = new Report();
            report.Description = model.ReportDescription;

            report.Page.PageWidth = new ReportSize(280, SizeTypes.Mm);
            report.Page.PageHeight = new ReportSize(210, SizeTypes.Mm);
            report.Width = new ReportSize(297, SizeTypes.Mm);
            report.Body.Height = new ReportSize(210, SizeTypes.Mm);
            
            DataSource dataSource = new DataSource
            {
                Name = "DataSource",
                DataSourceReference = ConfigurationManager.AppSettings["SharedSsrsDataSourceName"] 
            };

            report.DataSources.Add(dataSource);
            
            report.DataSets.Add(new DataSet()
                                      {
                                         Name = "DataSet1",
                                         Fields = this.ssrsProvider.GetFieldsFromQuery(model.DatabaseName, model.Query),
                                         Query = new Query()
                                                     {
                                                         CommandType = CommandTypes.Text,
                                                         CommandText = string.Format("USE {0}; {1}", model.DatabaseName, model.Query),
                                                         Timeout = 30,
                                                         DataSourceName = report.DataSources[0].Name
                                                     }
                                      });
            
            //report.ReportParameters.Add(new ReportParameter()
            //                                {
            //                                    DataType = DataTypes.String,
            //                                    UsedInQuery = UsedInQueryTypes.False,
            //                                    MultiValue = false,
            //                                    Prompt = "?",
            //                                    Name = "TestParameter",
            //                                    AllowBlank = true
            //                                });

            Tablix tablix = new Tablix()
                                {
                                    Name = "tablix1",
                                    Width = new ReportSize("250mm"),
                                    Left = new ReportSize("3mm")
                                };

            tablix.DataSetName = report.DataSets[0].Name;

            var colHeirarcy = new TablixHierarchy();
            var rowHeirarcy = new TablixHierarchy();

            foreach (var field in report.DataSets[0].Fields)
            {
                tablix.TablixBody.TablixColumns.Add(new TablixColumn() { Width = new ReportSize(50, SizeTypes.Mm) });
            }

            TablixRow header = new TablixRow()
                                   {
                                       Height = new ReportSize(8, SizeTypes.Mm)
                                   };
            foreach (var field in report.DataSets[0].Fields)
            {
                TablixCell cell = new TablixCell();
                Textbox tbx = new Textbox();
                tbx.Name = tablix.Name + "_Header_txt" + field.Name.Replace(" ", string.Empty);
                tbx.Paragraphs[0].TextRuns[0].Value = field.Name;
                tbx.Paragraphs[0].TextRuns[0].Style = new Style()
                                                          {
                                                              FontWeight = new ReportExpression<FontWeights>(FontWeights.Bold),
                                                              FontSize = new ReportExpression<ReportSize>("10pt"),
                                                          };

                cell.CellContents = new CellContents() { ReportItem = tbx };
                header.TablixCells.Add(cell);
                colHeirarcy.TablixMembers.Add(new TablixMember());
            }

            tablix.TablixBody.TablixRows.Add(header);

            TablixRow row = new TablixRow()
            {
                Height = new ReportSize(5, SizeTypes.Mm)
            }; 
            foreach (var field in report.DataSets[0].Fields)
            {
                TablixCell cell = new TablixCell();
               
                Textbox tbx = new Textbox();
                tbx.Name = "txt" + field.Name.Replace(" ", string.Empty);
                tbx.Paragraphs[0].TextRuns[0].Value = "=Fields!" + field.Name + ".Value";
                tbx.Paragraphs[0].TextRuns[0].Style = new Style()
                {
                    FontSize = new ReportExpression<ReportSize>("8pt")
                };
                cell.CellContents = new CellContents() { ReportItem = tbx };
                row.TablixCells.Add(cell);
            }

            tablix.TablixBody.TablixRows.Add(row);
            var mem = new TablixMember() { KeepTogether = true };
            var mem2 = new TablixMember() { Group = new Group { Name = "Details" } };
            rowHeirarcy.TablixMembers.Add(mem);
            rowHeirarcy.TablixMembers.Add(mem2);

            tablix.TablixColumnHierarchy = colHeirarcy;
            tablix.TablixRowHierarchy = rowHeirarcy;

            tablix.Style = new Style()
                               {
                                   Border = new Border()
                               };

            report.Body.ReportItems.Add(tablix);

            RdlSerializer serializer = new RdlSerializer();

            using (MemoryStream ms = new MemoryStream())
            {
                serializer.Serialize(ms, report);
                ssrs.CreateCatalogItem("Report", model.ReportName, "/", false, ms.ToArray(), null, out warnings);
            }
        }
    }
}
