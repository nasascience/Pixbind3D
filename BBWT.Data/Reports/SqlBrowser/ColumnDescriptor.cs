namespace BBWT.Data.Reports.SqlBrowser
{
    /// <summary>
    /// Descriptor of table field
    /// </summary>
    public class ColumnDescriptor
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
