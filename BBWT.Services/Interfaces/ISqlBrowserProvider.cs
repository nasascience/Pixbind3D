namespace BBWT.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Linq;
    using BBWT.Data.Reports.SqlBrowser;

    /// <summary>
    /// ISqlBrowserProvider interface
    /// </summary>
    public interface ISqlBrowserProvider
    {
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
        /// Method that returns list of column from specified table and database
        /// </summary>
        /// <param name="dbname">Database name</param>
        /// <param name="tablename">Table name</param>
        /// <returns>List of columns</returns>
        IQueryable<ColumnDescriptor> GetColumns(string dbname, string tablename);
    }
}
