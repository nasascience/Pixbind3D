namespace BBWT.Data.Reports.SqlBrowser
{
    using System;

    /// <summary>
    /// Class that describes Database object
    /// </summary>
    public class DatabaseDescriptor
    {
        /// <summary>
        /// Database Id
        /// </summary>
        public Int16 dbid { get; set; }

        /// <summary>
        /// Database Name
        /// </summary>
        public string name { get; set; }
    }
}
