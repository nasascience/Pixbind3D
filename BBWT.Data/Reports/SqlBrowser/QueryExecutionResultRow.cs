using System.Collections.Generic;

namespace BBWT.Data.Reports.SqlBrowser
{
    /// <summary>
    /// Class that describes query execution result cell
    /// </summary>
    public class QueryExecutionResultRow
    {
        public QueryExecutionResultRow()
        {
            this.Cells = new List<QueryExecutionResultCell>();
        }

        /// <summary>
        /// Cells
        /// </summary>
        public List<QueryExecutionResultCell> Cells { get; set; }
    }
}
