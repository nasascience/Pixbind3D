using System.Collections.Generic;
using System.Linq;

namespace BBWT.Services.Classes
{
    using BBWT.Domain;
    using BBWT.DTO.Reports.SqlBrowser;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// ISqlBrowserService implementation
    /// </summary>
    public class SqlBrowserService : ISqlBrowserService
    {

        private readonly ISqlBrowserDataContext sqlBrowserDataContext;

        /// <summary>
        /// Custom constructor
        /// </summary>
        /// <param name="sqlBrowserDataContext">Injected SqlBrowserDataContext</param>
        public SqlBrowserService(ISqlBrowserDataContext sqlBrowserDataContext)
        {
            this.sqlBrowserDataContext = sqlBrowserDataContext;
        }

        /// <summary>
        /// Executes specified query against specified database
        /// </summary>
        /// <param name="dbname">database name</param>
        /// <param name="query">T-SQL query</param>
        /// <returns>QueryExecutionResultDTO</returns>
        public QueryExecutionResultDTO RunQuery(string dbname, string query)
        {
            var queryExecutionResult = this.sqlBrowserDataContext.RunQuery(dbname, query);
            
            var result = new QueryExecutionResultDTO()
                       {
                           Rows = new List<QueryExecutionResultRowDTO>(),
                           Columns = queryExecutionResult.Columns,
                           Exception = queryExecutionResult.Exception
                       };

            if (queryExecutionResult.Rows != null)
            {
                foreach (var row in queryExecutionResult.Rows)
                {
                    var newRowDto = new QueryExecutionResultRowDTO();
                    newRowDto.Cells =
                        row.Cells.Select(c => new QueryExecutionResultCellDTO() {Value = c.Value}).ToList();

                    result.Rows.Add(newRowDto);
                }
            }

            return result;
        }
    }
}
