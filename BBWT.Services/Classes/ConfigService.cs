namespace BBWT.Services.Classes
{
    using System;
    using System.IO;
    using System.Web.Hosting;
    using System.Xml.Serialization;

    using BBWT.Data.Settings;
    using BBWT.Services.Interfaces;

    using Common.Logging;

    /// <summary>
    /// Configuration service
    /// </summary>
    public class ConfigService : IConfigService
    {        
        private static ILog loggerInstance = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Configuration file name
        /// </summary>
        private readonly string configFileName;

        /// <summary>
        /// Initializes config service instance
        /// </summary>
        public ConfigService()
        {
            this.configFileName = HostingEnvironment.MapPath(@"~/app_data/system.config");
            this.Settings = new BBWTConfig();
            this.Load();
        }

        /// <summary>
        /// Set of application settings
        /// </summary>
        public BBWTConfig Settings { get; set; }

        /// <summary>
        /// Load settings from file if exists
        /// </summary>
        public void Load()
        {
            if (!File.Exists(this.configFileName) || this.Settings == null)
            {
                return;
            }

            try
            {
                lock (this.Settings)
                {
                    using (var fs = new FileStream(this.configFileName, FileMode.Open))
                    {
                        var serializer = new XmlSerializer(typeof(BBWTConfig));
                        serializer.Serialize(fs, this.Settings);
                    }
                }
            }
            catch (Exception ex)
            {
                loggerInstance.Error("Can't load settings", ex);
            }
        }

        /// <summary>
        /// Save settings to file
        /// </summary>
        public void Save()
        {
            try
            {
                lock (this.Settings)
                {
                    using (var fs = new FileStream(this.configFileName, FileMode.Create))
                    {
                        var serializer = new XmlSerializer(typeof(BBWTConfig));
                        serializer.Serialize(fs, this.Settings);
                    }
                }
            }
            catch (Exception ex)
            {
                loggerInstance.Error("Can't save settings", ex);
            }
        }
    }
}
