namespace BBWT.DTO.Template
{
    using System.Collections.Generic;

    /// <summary>
    /// EmailTemplate DTO class
    /// </summary>
    public class EmailTemplateDetailsDTO
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

        /// <summary>
        /// The From Address
        /// </summary>
        public string From { get; set; }

        /// <summary>
        /// The Subject
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// The message body
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// The notes
        /// </summary>
        public string Notes { get; set; }

        /// <summary>
        /// Email template parameters
        /// </summary>
        public List<TemplateParameterDTO> Parameters { get; set; }
    }
}
