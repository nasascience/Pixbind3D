namespace BBWT.Data.Reports
{
    /// <summary>
    /// Create Report model
    /// </summary>
    public class CreateReportModel
    {
        /// <summary>
        /// Report name
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

        /// <summary>
        /// RdlDefinition
        /// </summary>
        public byte[] RdlDefinition { get; set; }
    }
}
