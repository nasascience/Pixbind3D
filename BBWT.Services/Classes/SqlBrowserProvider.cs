namespace BBWT.Services.Classes
{
    using System.Linq;
    using BBWT.Data.Reports.SqlBrowser;
    using BBWT.Domain;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// ISqlBrowserProvider interface
    /// </summary>
    public class SqlBrowserProvider : ISqlBrowserProvider
    {
        private readonly ISqlBrowserDataContext sqlBrowserDataContext;

        /// <summary>
        /// Custom constructor
        /// </summary>
         /// <param name="sqlBrowserDataContext">Injected SqlBrowserDataContext</param>
        public SqlBrowserProvider(ISqlBrowserDataContext sqlBrowserDataContext)
        {
            this.sqlBrowserDataContext = sqlBrowserDataContext;
        }

        /// <summary>
        /// Method that returns list of available databases
        /// </summary>
        /// <returns>Ienumerable of DatabaseDescriptor</returns>
         public IQueryable<DatabaseDescriptor> GetDatabases()
        {
            return this.sqlBrowserDataContext.GetDatabases();
        }

         /// <summary>
         /// Method that returns list of tables from specified database
         /// </summary>
         /// <param name="dbname">Database name</param>
         /// <returns>List of tables</returns>
        public IQueryable<string> GetTables(string dbname)
        {
            return this.sqlBrowserDataContext.GetTables(dbname);
        }

        /// <summary>
        /// Method that returns list of column from specified table and database
        /// </summary>
        /// <param name="dbname">Database name</param>
        /// <param name="tablename">Table name</param>
        /// <returns>List of columns</returns>
        public IQueryable<ColumnDescriptor> GetColumns(string dbname, string tablename)
        {
            return this.sqlBrowserDataContext.GetColumns(dbname, tablename);
        }
    }
}
