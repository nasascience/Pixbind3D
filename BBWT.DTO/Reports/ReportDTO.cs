namespace BBWT.DTO.Reports
{
    using System.Collections.Generic;

    /// <summary>
    /// SSRS Report
    /// </summary>
    public class ReportDTO
    {
        /// <summary>
        /// ID
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Report Name
        /// </summary>
        public string ReportName { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Report Path
        /// </summary>
        public string ReportPath { get; set; }
    }
}
