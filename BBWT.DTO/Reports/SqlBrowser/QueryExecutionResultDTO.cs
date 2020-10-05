namespace BBWT.DTO.Reports.SqlBrowser
{
    using System.Collections.Generic;

    /// <summary>
    /// Class that describes query execution result
    /// </summary>
    public class QueryExecutionResultDTO
    {
        /// <summary>
        /// Collection of columns
        /// </summary>
        public IEnumerable<string> Columns { get; set; }

        /// <summary>
        /// Collection of Rows with data
        /// </summary>
        public List<QueryExecutionResultRowDTO> Rows { get; set; }

        /// <summary>
        /// Execution error message
        /// </summary>
        public string Exception { get; set; }
    }
}
