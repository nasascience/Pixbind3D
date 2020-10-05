namespace BBWT.SSRS.Models
{
    using System.Collections.Generic;

    /// <summary>
    /// Class that describes Ssrs report object
    /// </summary>
    public class SsrsReport
    {
        /// <summary>
        /// Report Id
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
        /// Report path
        /// </summary>
        public string ReportPath { get; set; }
    }
}
