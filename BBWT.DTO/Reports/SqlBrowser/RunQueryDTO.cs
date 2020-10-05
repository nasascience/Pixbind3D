namespace BBWT.DTO.Reports.SqlBrowser
{
    /// <summary>
    /// Class that describes RunQueryDTO
    /// </summary>
    public class RunQueryDTO
    {
        /// <summary>
        /// Database name
        /// </summary>
        public string DbName { get; set; }

        /// <summary>
        /// Query
        /// </summary>
        public string Query { get; set; }
    }
}
