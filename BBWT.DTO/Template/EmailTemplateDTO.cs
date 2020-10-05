namespace BBWT.DTO.Template
{
    /// <summary>
    /// EmailTemplate DTO class
    /// </summary>
    public class EmailTemplateDTO
    {
        /// <summary>
        /// Key
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The code
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// The title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// The IsSystem
        /// </summary>
        public bool IsSystem { get; set; }
    }
}
