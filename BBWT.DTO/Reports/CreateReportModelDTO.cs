namespace BBWT.DTO.Reports
{
    /// <summary>
    /// CreateReportModelDTO
    /// </summary>
    public class CreateReportModelDTO
    {
        /// <summary>
        /// Name of the Report
        /// </summary>
        public string ReportName { get; set; }
        
        /// <summary>
        /// Report Description
        /// </summary>
        public string ReportDescription { get; set; }

        /// <summary>
        /// Database Name
        /// </summary>
        public string DatabaseName { get; set; }

        /// <summary>
        /// Query
        /// </summary>
        public string Query { get; set; }
    }
}
