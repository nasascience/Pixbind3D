namespace BBWT.Data.Template
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// The template parameter class
    /// </summary>
    public class TemplateParameter : Entity
    {
        /// <summary>
        /// The constructor
        /// </summary>
        public TemplateParameter()
        {
            this.Id = 0;
        }

        /// <summary>
        /// Title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Notes
        /// </summary>
        public string Notes { get; set; }

        /// <summary>
        /// The link to EmailTemplate or null if standard parameter
        /// </summary>
        public virtual EmailTemplate Template { get; set; }
    }
}
