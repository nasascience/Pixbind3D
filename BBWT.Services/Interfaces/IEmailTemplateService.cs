namespace BBWT.Services.Interfaces
{
    using System;
    using System.Linq;

    using BBWT.Data.Template;

    /// <summary>
    /// The IEmailTemplate
    /// </summary>
    public interface IEmailTemplateService
    {
        /// <summary>
        /// Get All templates
        /// </summary>
        /// <returns>Query results of EmailTemplate</returns>
        IQueryable<EmailTemplate> GetAllTemplates();

        /// <summary>
        /// The Get template
        /// </summary>
        /// <param name="id">id of template</param>
        /// <returns>EmailTemplate</returns>
        EmailTemplate GetTemplateById(int id);

        /// <summary>
        /// The Get template
        /// </summary>
        /// <param name="code">code of template</param>
        /// <returns>EmailTemplate</returns>
        EmailTemplate GetTemplateByCode(string code);

        /// <summary>
        /// Get list of system parameters
        /// </summary>
        /// <returns>List of parameters</returns>
        IQueryable<TemplateParameter> GetSystemParameters();

        /// <summary>
        /// The Find template
        /// </summary>
        /// <param name="title">string of title</param>
        /// <returns>Query results of EmailTemplate</returns>
        IQueryable<EmailTemplate> FindTemplate(string title);

        /// <summary>
        /// The Save template
        /// </summary>
        /// <param name="template">The EmailTemplate</param>
        void Save(EmailTemplate template);

        /// <summary>Update template</summary>
        /// <param name="id">Template id</param>
        /// <param name="action">action which updates db object</param>
        void Update(int id, Action<EmailTemplate> action);

        /// <summary>
        /// Delete email template
        /// </summary>
        /// <param name="template">Template to delete</param>
        void Delete(EmailTemplate template);
    }
}
