namespace BBWT.Data.Reports.SqlBrowser
{
    using System.Collections.Generic;

    /// <summary>
    /// Class that describes query execution result
    /// </summary>
    public class QueryExecutionResult
    {
        /// <summary>
        /// Collection of columns
        /// </summary>
        public List<string> Columns { get; set; }

        /// <summary>
        /// Collection of Rows with data
        /// </summary>
        public List<QueryExecutionResultRow> Rows { get; set; }

        /// <summary>
        /// Execution error message
        /// </summary>
        public string Exception { get; set; }
    }
}
