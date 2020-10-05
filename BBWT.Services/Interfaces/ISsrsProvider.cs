namespace BBWT.Services.Interfaces
{
    using System.Collections.Generic;
    using System.Linq;
    using SSRS.Models;
   
    /// <summary>
    /// Ssrs web service provider interface
    /// </summary>
    public interface ISsrsProvider
    {
        /// <summary>
        /// Returns list of available SSRS reports
        /// </summary>
        /// <returns>List of CatalogItems (Reports)</returns>
        IQueryable<SsrsReport> GetReports();

        /// <summary>
        /// Returns SSRS report info
        /// </summary>
        /// <param name="name">Report name</param>
        /// <returns>SSRS Report info</returns>
        IQueryable<SsrsReport> GetReportInfo(string name);

        /// <summary>
        /// Returns SSRS report info
        /// </summary>
        /// <param name="id">Report id</param>
        /// <returns>SSRS Report info</returns>
        IQueryable<SsrsReport> GetReportInfoById(string id);

        /// <summary>
        /// Returns list of SSRS report's parameters
        /// </summary>
        /// <param name="reportPath">Path to SSRS report</param>
        /// <returns>:List of SSRS report's parameters</returns>
        IQueryable<SsrsParameter> GetReportParameters(string reportPath);

        /// <summary>
        /// Executes report and returns file
        /// </summary>
        /// <param name="path">Path to SSRS report</param>
        /// <param name="format">Export format</param>
        /// <param name="parameters">Array of SsrsParameter</param>
        /// <returns>Array of bytes</returns>
        byte[] ExportReport(string path, string format, List<SsrsParameter> parameters);

        /// <summary>
        /// Returns list of the file extensions
        /// </summary>
        /// <param name="format">Export format</param>
        /// <returns>Extension string representation</returns>
        string GetExtension(string format);

        /// <summary>
        /// Returns list of fields from T-SQL query
        /// </summary>
        /// <param name="database">database name</param>
        /// <param name="query">T-SQL query</param>
        /// <returns>List of fields</returns>
        List<Microsoft.ReportingServices.RdlObjectModel.Field> GetFieldsFromQuery(string database, string query);
    }
}
