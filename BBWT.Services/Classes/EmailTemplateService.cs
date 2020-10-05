namespace BBWT.Services.Classes
{
    using System;
    using System.Linq;

    using BBWT.Data.Template;
    using BBWT.Domain;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// The EmailTemplateService class
    /// </summary>
    public class EmailTemplateService : IEmailTemplateService
    {
        private readonly IDataContext context;

        /// <summary>
        /// The EmailTemplateService constructor
        /// </summary>
        /// <param name="ctx">DataContext interface</param>
        public EmailTemplateService(IDataContext ctx)
        {
            this.context = ctx;
        }

        /// <summary>
        /// The GetAll templates
        /// </summary>
        /// <returns>Query result of EmailTemplate</returns>
        public IQueryable<EmailTemplate> GetAllTemplates()
        {
            return this.context.EmailTemplates.OrderBy(t => t.Code);
        }

        /// <summary>
        /// The Get template by id
        /// </summary>
        /// <param name="id">Id of template</param>
        /// <returns>EmailTemplate</returns>
        public EmailTemplate GetTemplateById(int id)
        {
            return this.context.EmailTemplates.Find(id);
        }

        /// <summary>
        /// Get list of system parameters
        /// </summary>
        /// <returns>List of parameters</returns>
        public IQueryable<TemplateParameter> GetSystemParameters()
        {
            return this.context.TemplateParameters.Where(it => it.Template == null);
        }

        /// <summary>
        /// The Get template by code
        /// </summary>
        /// <param name="code">code of template</param>
        /// <returns>EmailTemplate</returns>
        public EmailTemplate GetTemplateByCode(string code)
        {
            return this.context.EmailTemplates.FirstOrDefault(t => t.Code == code);
        }

        /// <summary>
        /// The Find the templates by title
        /// </summary>
        /// <param name="title">The part of Title string</param>
        /// <returns>Query result of EmailTemplate</returns>
        public IQueryable<EmailTemplate> FindTemplate(string title)
        {
            return this.context.EmailTemplates.Where(t => t.Code.Contains(title) || t.Title.Contains(title));
        }

        /// <summary>
        /// Save template
        /// </summary>
        /// <param name="template">The EmailTemplate</param>
        public void Save(EmailTemplate template)
        {
            if (template.Id == 0)
            {
                this.context.EmailTemplates.Add(template);
            }

            this.context.Commit();
        }

        /// <summary>Update template</summary>
        /// <param name="id">Template id</param>
        /// <param name="action">action which updates db object</param>
        public void Update(int id, Action<EmailTemplate> action)
        {
            var db = this.GetTemplateById(id);

            action(db);

            this.context.Commit();
        }

        /// <summary>
        /// Delete email template
        /// </summary>
        /// <param name="template">Email template</param>
        public void Delete(EmailTemplate template)
        {
            this.context.EmailTemplates.Remove(template);

            this.context.Commit();
        }
    }
}
