namespace BBWT.Services.Classes
{
    using System.Configuration;

    using BBWT.Services.Interfaces;
    using Microsoft.SqlServer.ReportingServices2010;

    /// <summary>
    /// Ssrs web service wrapper provider interface implemetation
    /// </summary>
    public class SsrsWrapperProvider : ISsrsWrapperProvider
    {
        /// <summary>
        /// Returns SSRS web service wrapper
        /// </summary>
        /// <returns>SSRS web service wrapper</returns>
        public ReportingService2010 GetReportingServiceWrapper()
        {
            ReportingService2010 service = new ReportingService2010();
            service.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["ReportingServiceLogin"],
                                                                   ConfigurationManager.AppSettings["ReportingServicePassword"],
                                                                   ConfigurationManager.AppSettings["ReportingServiceDomain"]);
            
            return service;
        }
    }
}
