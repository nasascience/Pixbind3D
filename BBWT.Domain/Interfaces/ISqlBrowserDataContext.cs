namespace BBWT.Domain
{
    using System.Data.Common;
    using System.Linq;

    using BBWT.Data.Reports.SqlBrowser;

    /// <summary>
    /// ISqlBrowserDataContext interface
    /// </summary>
    public interface ISqlBrowserDataContext
    {
        /// <summary>
        /// Current Database Connection
        /// </summary>
        DbConnection Connection { get; }

        /// <summary>
        /// Method that returns list of available databases
        /// </summary>
        /// <returns>Ienumerable of DatabaseDescriptor</returns>
        IQueryable<DatabaseDescriptor> GetDatabases();

        /// <summary>
        /// Method that returns list of tables from specified database
        /// </summary>
        /// <param name="dbname">Database name</param>
        /// <returns>List of tables</returns>
        IQueryable<string> GetTables(string dbname);

        /// <summary>
        /// Method that returns list of views from specified database
        /// </summary>
        /// <param name="dbname">Database name</param>
        /// <returns>List of views</returns>
        IQueryable<string> GetViews(string dbname);
        
        /// <summary>
        /// Method that returns list of column from specified table and database
        /// </summary>
        /// <param name="dbname">Database name</param>
        /// <param name="tablename">Table name</param>
        /// <returns>List of columns</returns>
        IQueryable<ColumnDescriptor> GetColumns(string dbname, string tablename);

        /// <summary>
        /// Executes specified query against specified database
        /// </summary>
        /// <param name="dbname">database name</param>
        /// <param name="query">T-SQL query</param>
        /// <returns>QueryExecutionResult</returns>
        QueryExecutionResult RunQuery(string dbname, string query);
    }
}
