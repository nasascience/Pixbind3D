namespace BBWT.Services.Interfaces
{
    using BBWT.DTO.Reports.SqlBrowser;

    /// <summary>
    /// ISqlBrowserService interface
    /// </summary>
    public interface ISqlBrowserService
    {
        /// <summary>
        /// Executes specified query against specified database
        /// </summary>
        /// <param name="dbname">database name</param>
        /// <param name="query">T-SQL query</param>
        /// <returns>QueryExecutionResult</returns>
        QueryExecutionResultDTO RunQuery(string dbname, string query);
    }
}
