namespace BBWT.Data.Settings
{
    /// <summary>
    /// Company registration configuration
    /// </summary>
    public class CompanyRegistrationConfig
    {
        /// <summary>
        /// Is company registration allowed for everyone
        /// </summary>
        public bool IsAllowedForEveryone { get; set; }

        /// <summary>
        /// Is direct registration allowed
        /// </summary>
        public bool IsDirectRegistrationAllowed { get; set; }

        /// <summary>
        /// Registration URL
        /// </summary>
        public string RegistrationURL { get; set; }
    }
}
