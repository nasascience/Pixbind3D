namespace BBWT.DTO.Reports.SqlBrowser
{
    using System;

    /// <summary>
    /// Class that describes Database object
    /// </summary>
    public class DatabaseDescriptorDTO
    {
        /// <summary>
        /// Database Id
        /// </summary>
        public Int16 Id { get; set; }

        /// <summary>
        /// Database Name
        /// </summary>
        public string Name { get; set; }
    }
}
