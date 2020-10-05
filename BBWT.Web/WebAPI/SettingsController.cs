namespace BBWT.Web.WebAPI
{
    using System.Linq;
    using System.Net;
    using System.Web.Http;

    using BBWT.Data.Settings;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Settings controller
    /// </summary>
    public class SettingsController : ApiController
    {
        private const string CompanyRegistrationPath = "#!/admin/companies/0";

        private const string UserRegistrationPath = "#!/admin/users/0";

        private readonly IConfigService configService;

        private readonly ISecurityService securityService;

        /// <summary>Initializes settings controller</summary>
        /// <param name="config">configuration service instance</param>
        /// <param name="security">security service instance</param>
        public SettingsController(IConfigService config, ISecurityService security)
        {
            this.configService = config;
            this.securityService = security;
        }

        /// <summary>
        /// Read application settings
        /// </summary>
        /// <returns>Settings object</returns>
        public BBWTConfig Load()
        {
            return this.configService.Settings;
        }

        /// <summary>
        /// Write application settings
        /// </summary>
        /// <param name="cfg">Settings object</param>
        public void Save(BBWTConfig cfg)
        {
            this.configService.Settings = cfg;
            this.configService.Save();
        }

        /// <summary>
        /// Get company registration URL
        /// </summary>
        /// <returns>URL</returns>
        [HttpPost]
        public string GetCompanyRegistrationURL()
        {
            return string.Format("{0}?ticket={1}", CompanyRegistrationPath, this.securityService.CreateTicket());
        }

        /// <summary>
        /// Read Server Information
        /// </summary>
        /// <returns>ServerInfo object</returns>
        public ServerInfo GetServerInfo()
        {
            var localIPs = Dns.GetHostEntry(Dns.GetHostName()).AddressList.Where(a => !a.IsIPv6LinkLocal);
            var ipaddresses = localIPs as IPAddress[] ?? localIPs.ToArray();
            var localIpAddress = ipaddresses.Aggregate(string.Empty, (current, ipAddress) => current + (ipAddress + "<br>"));            

            var publicIp = Dns.GetHostEntry(Request.RequestUri.Host).AddressList[0];

            var result = new ServerInfo
            {
                Name = this.configService.Settings.App.ServerName,
                LocalIp = localIpAddress,
                PublicIp = publicIp.ToString()
            };            

            return result;
        }        
    }
}
