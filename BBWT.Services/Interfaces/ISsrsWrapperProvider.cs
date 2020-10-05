namespace BBWT.Services.Interfaces
{
    using System.Security.Principal;
    using Microsoft.SqlServer.ReportingServices2010;

    /// <summary>
    /// Ssrs web service wrapper provider interface
    /// </summary>
    public interface ISsrsWrapperProvider
    {
        /// <summary>
        /// Returns SSRS web service wrapper
        /// </summary>
        /// <returns>SSRS web service wrapper</returns>
        ReportingService2010 GetReportingServiceWrapper();
    }
}
