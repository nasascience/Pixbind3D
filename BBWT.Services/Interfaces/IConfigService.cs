namespace BBWT.Services.Interfaces
{
    using BBWT.Data.Settings;

    /// <summary>
    /// Configuration service
    /// </summary>
    public interface IConfigService
    {
        /// <summary>
        /// Application settings instance
        /// </summary>
        BBWTConfig Settings { get; set; }

        /// <summary>
        /// Load settings from storage
        /// </summary>
        void Load();

        /// <summary>
        /// Save settings to storage
        /// </summary>
        void Save();
    }
}
