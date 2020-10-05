namespace BBWT.Domain
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.Common;
    using System.Data.Entity;
    using System.Data.Entity.Core.Objects;
    using System.Data.Entity.Infrastructure;
    using System.Data.SqlClient;
    using System.Linq;

    using BBWT.Data.Reports.SqlBrowser;

    using Common.Logging;

    /// <summary>
    /// Data context definition
    /// </summary>
    public class SqlBrowserDataContext : DbContext, ISqlBrowserDataContext
    {
        /// <summary>
        /// Class logger definition
        /// </summary>
        private static readonly ILog Log = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Constructs new instance of SqlBrowserDataContext/>
        /// </summary>
        public SqlBrowserDataContext()
            : base("DefaultConnection")
        {
        }

        /// <summary>
        /// Current Database Connection
        /// </summary>
        /// <remarks>Be careful with low-level connection object!</remarks>
        public DbConnection Connection
        {
            get
            {
                return this.Database.Connection;
            }
        }

        /// <summary>
        /// Method that returns list of available databases
        /// </summary>
        /// <returns>Ienumerable of DatabaseDescriptor</returns>
        public IQueryable<DatabaseDescriptor> GetDatabases()
        {
            return
                this.Database.SqlQuery<DatabaseDescriptor>(
                    "SELECT * FROM master.sys.databases db WHERE db.name NOT IN ('master', 'tempdb', 'model', 'msdb') AND db.name NOT LIKE 'ReportServer%' AND db.[state] = 0").AsQueryable();
        }

        /// <summary>
        /// Method that returns list of tables from specified database
        /// </summary>
        /// <param name="dbname">Database name</param>
        /// <returns>List of tables</returns>
        public IQueryable<string> GetTables(string dbname)
        {
            return
                this.Database.SqlQuery<string>(
                    string.Format("USE [{0}] SELECT name FROM sysobjects WHERE type = 'U' ", dbname)).AsQueryable();
        }

        /// <summary>
        /// Method that returns list of views from specified database
        /// </summary>
        /// <param name="dbname">Database name</param>
        /// <returns>List of views</returns>
        public IQueryable<string> GetViews(string dbname)
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// Method that returns list of column from specified table and database
        /// </summary>
        /// <param name="dbname">Database name</param>
        /// <param name="tablename">Table name</param>
        /// <returns>List of columns</returns>
        public IQueryable<ColumnDescriptor> GetColumns(string dbname, string tablename)
        {
            var query = string.Format(
                                @"USE [{0}]  
                                SELECT col.name as Name, 
                                (CASE WHEN fk.COLUMN_NAME IS NULL THEN CONVERT(BIT, 0) ELSE CONVERT(BIT, 1) END) IsForeignKey, 
                                (CASE WHEN pk.COLUMN_NAME IS NULL THEN CONVERT(BIT, 0) ELSE CONVERT(BIT, 1) END) IsPrimaryKey 
                                FROM SYSOBJECTS obj INNER JOIN syscolumns col ON obj.id = col.id 
                                LEFT JOIN 
                                     (SELECT Col.Column_Name 
                                     FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS Tab, 
                                     INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE Col 
                                     WHERE Col.Constraint_Name = Tab.Constraint_Name 
                                       AND Col.Table_Name = Tab.Table_Name 
                                       AND Constraint_Type = 'FOREIGN KEY' 
                                       AND Col.Table_Name = '{1}') fk ON fk.COLUMN_NAME = col.name
                                LEFT JOIN 
                                     (SELECT Col.Column_Name 
                                      FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS Tab, 
                                      INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE Col 
                                      WHERE Col.Constraint_Name = Tab.Constraint_Name 
                                      AND Col.Table_Name = Tab.Table_Name 
                                      AND Constraint_Type = 'PRIMARY KEY' 
                                      AND Col.Table_Name = '{1}') pk ON pk.COLUMN_NAME = col.name
                                 WHERE obj.name = '{1}'", 
                                 dbname,
                                 tablename);

            return this.Database.SqlQuery<ColumnDescriptor>(query).AsQueryable();
        }

        /// <summary>
        /// Executes specified query against specified database
        /// </summary>
        /// <param name="dbname">Database name</param>
        /// <param name="query">T-SQL Query</param>
        /// <returns></returns>
        public QueryExecutionResult RunQuery(string dbname, string query)
        {
            query = string.Format("USE [{0}] {1}", dbname, query);

            var r = new QueryExecutionResult
                        {
                            Columns = new List<string>(),
                            Rows = new List<QueryExecutionResultRow>(),
                            Exception = string.Empty
                        };
            try
            {
                var a = new SqlDataAdapter(query, (SqlConnection)this.Connection);
                var dt = new DataTable();

                a.Fill(dt);

                for (int i = 0; i < dt.Columns.Count; i++)
                {
                    r.Columns.Add(dt.Columns[i].ColumnName);
                }

                for (int j = 0; j < dt.Rows.Count; j++)
                {
                    var row = new QueryExecutionResultRow();

                    for (int k = 0; k < dt.Columns.Count; k++)
                    {
                        row.Cells.Add(new QueryExecutionResultCell(){Value = dt.Rows[j][k].ToString()});
                    }

                    r.Rows.Add(row);
                }
                
                return r;

            }
            catch (Exception e)
            {
                return new QueryExecutionResult()
                           {
                               Exception = e.Message
                           };
            }
        }

        /// <summary>Dispose custom database context</summary>
        /// <param name="disposing">true if both managed/unmanaged resource should be disposed</param>
        protected override void Dispose(bool disposing)
        {
            try
            {
                if (this.ChangeTracker.HasChanges())
                {
                    var changedEntries =
                        this.ChangeTracker.Entries().Where(x => x.State != EntityState.Unchanged).ToList();

                    Log.Error("Database context has unsaved changes");
                    throw new DbUpdateException("Database context has unsaved changes");
                }
            }
            finally
            {
                base.Dispose(disposing);
            }
        }
    }
}