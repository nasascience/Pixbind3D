namespace BBWT.Web.WebAPI
{
    using System.Collections.Generic;
    using System.Web.Http;

    using AutoMapper.QueryableExtensions;
    using BBWT.DTO.Reports.SqlBrowser;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// WebAPI SqlBrowser controller
    /// </summary>
    public class SqlBrowserController : ApiController
    {
        private readonly ISqlBrowserProvider sqlBrowserProviderProvider;
        private readonly ISqlBrowserService sqlBrowserProviderService;

        /// <summary>
        /// Custom constructor
        /// </summary>
        /// <param name="sqlBrowserProviderProvider">Injected SqlBrowserProvider</param>
        /// <param name="sqlBrowserService">Injected SqlBrowserService</param>
        public SqlBrowserController(ISqlBrowserProvider sqlBrowserProviderProvider, ISqlBrowserService sqlBrowserService)
        {
            this.sqlBrowserProviderProvider = sqlBrowserProviderProvider;
            this.sqlBrowserProviderService = sqlBrowserService;
        }

        /// <summary>
        /// Returns list of available databases
        /// </summary>
        /// <returns>Ienumerable of DatabaseDescriptorDTO</returns>
        public IEnumerable<DatabaseDescriptorDTO> GetDatabases()
        {
            return this.sqlBrowserProviderProvider.GetDatabases().Project().To<DatabaseDescriptorDTO>();
        }

        /// <summary>
        /// Returns list of available tables
        /// </summary>
        /// <param name="dbname">Name of the database</param>
        /// <returns>Ienumerable of strings</returns>
        public IEnumerable<string> GetTables(string dbname)
        {
            return this.sqlBrowserProviderProvider.GetTables(dbname);
        }

        /// <summary>
        /// Returns list of available columns
        /// </summary>
        /// <param name="dbname">Name of the database</param>
        /// <param name="tablename">Name of the table</param>
        /// <returns>Ienumerable of ColumnDescriptorDTO</returns>
        public IEnumerable<ColumnDescriptorDTO> GetColumns(string dbname, string tablename)
        {
            return this.sqlBrowserProviderProvider.GetColumns(dbname, tablename).Project().To<ColumnDescriptorDTO>();
        }

        /// <summary>
        /// Executes specified query against specified database
        /// </summary>
        /// <param name="runQueryDto">Request object</param>
        /// <returns>QueryExecutionResultDTO</returns>
        [HttpPost]
        public QueryExecutionResultDTO RunQuery(RunQueryDTO runQueryDto)
        {
            return this.sqlBrowserProviderService.RunQuery(runQueryDto.DbName, runQueryDto.Query);
        }
    }
}