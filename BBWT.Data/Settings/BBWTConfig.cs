namespace BBWT.Data.Settings
{
    /// <summary>
    /// BBWT configuration class
    /// </summary>
    public class BBWTConfig
    {
        /// <summary>
        /// Creates configuration file instance
        /// </summary>
        public BBWTConfig()
        {
            this.App = new AppConfig { Name = "Blueberry Web Application Template", ServerName = string.Empty };

            this.Email = new EmailConfig();
            
            this.Support = new SupportConfig();

            this.CompanyRegistration = new CompanyRegistrationConfig();
        }

        /// <summary>
        /// Application settings
        /// </summary>
        public AppConfig App { get; set; }

        /// <summary>
        /// Email settings
        /// </summary>
        public EmailConfig Email { get; set; }

        /// <summary>
        /// Support team configuration
        /// </summary>
        public SupportConfig Support { get; set; }

        /// <summary>
        /// Company Registration Configuration
        /// </summary>
        public CompanyRegistrationConfig CompanyRegistration { get; set; }

        ///// <summary>
        ///// User Registration Configuration
        ///// </summary>
        ////public UserRegistrationConfig UserRegistration { get; set; }
    }
}