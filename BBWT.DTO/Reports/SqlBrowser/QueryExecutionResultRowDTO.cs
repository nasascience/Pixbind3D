using System.Collections.Generic;

namespace BBWT.DTO.Reports.SqlBrowser
{
    /// <summary>
    /// Class that describes query execution result row
    /// </summary>
    public class QueryExecutionResultRowDTO
    {
        public QueryExecutionResultRowDTO()
        {
            this.Cells = new List<QueryExecutionResultCellDTO>();
        }

        /// <summary>
        /// Cells
        /// </summary>
        public List<QueryExecutionResultCellDTO> Cells { get; set; }
    }
}
