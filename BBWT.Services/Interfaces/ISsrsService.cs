namespace BBWT.Services.Interfaces
{
    using BBWT.Data.Reports;

    /// <summary>
    /// Ssrs service
    /// </summary>
    public interface ISsrsService
    {
        /// <summary>
        /// Create report
        /// </summary>
        /// <param name="model">Create report model</param>
        void CreateReport(CreateReportModel model);
    }
}
