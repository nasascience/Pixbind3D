namespace BBWT.Data.Template
{
    using System.Collections.Generic;

    /// <summary>
    /// Email message template
    /// </summary>
    public class EmailTemplate : Entity
    {
        /// <summary>
        /// The EmailTemplate constructor
        /// </summary>
        public EmailTemplate()
        {
            this.Id = 0;
            this.IsSystem = false;
        }

        /// <summary>
        /// Code
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// IsSystem
        /// </summary>
        public bool IsSystem { get; set; }

        /// <summary>
        /// Address From
        /// </summary>
        public string From { get; set; }

        /// <summary>
        /// Subject
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// Message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Notes
        /// </summary>
        public string Notes { get; set; }

        /// <summary>
        /// List of parameters
        /// </summary>
        public virtual ICollection<TemplateParameter> Parameters { get; set; }
    }
}
