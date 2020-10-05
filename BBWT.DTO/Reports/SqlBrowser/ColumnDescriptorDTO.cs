namespace BBWT.DTO.Reports.SqlBrowser
{
    /// <summary>
    /// Class that describes Column object
    /// </summary>
    public class ColumnDescriptorDTO
    {
        /// <summary>
        /// Field name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Primary key flag
        /// </summary>
        public bool IsPrimaryKey { get; set; }

        /// <summary>
        /// Foreign key flag
        /// </summary>
        public bool IsForeignKey { get; set; }
    }
}
