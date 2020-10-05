namespace BBWT.Services.Messages
{
    using System.Collections.Specialized;
    using System.Diagnostics.CodeAnalysis;
    using System.Net.Mail;

    using BBWT.Data.Template;

    /// <summary>
    /// Email composer interface
    /// </summary>
    public interface IEmailComposer
    {
        /// <summary>
        /// The build email message
        /// </summary>
        /// <param name="subject">The subject string</param>
        /// <param name="body">The body string</param>
        /// <param name="from">The from address</param>
        /// <param name="to">The list of to address</param>
        /// <param name="cc">The list of cc address</param>
        /// <returns>The email message</returns>
        MailMessage BuildEmailMessage(string subject, string body, MailAddress from, MailAddressCollection to, MailAddressCollection cc = null);

        /// <summary>
        /// The build email message
        /// </summary>
        /// <param name="templateCode">The template code</param>
        /// <param name="tagValues">The tags values</param>
        /// <param name="toEmails">TO email address string</param>
        /// <param name="ccEmails">CC email address string</param>
        /// <returns>Mail message</returns>
        [SuppressMessage("StyleCop.CSharp.NamingRules", "SA1305:FieldNamesMustNotUseHungarianNotation", Justification = "Reviewed. Suppression is OK here.")]
        MailMessage BuildEmailMessage(string templateCode, NameValueCollection tagValues, string toEmails, string ccEmails = null);

        /// <summary>
        /// The build email message
        /// </summary>
        /// <param name="templateCode">The template code</param>
        /// <param name="tagValues">The tags values</param>
        /// <param name="to">The address list To.</param>
        /// <param name="cc">The address list cc.</param>
        /// <returns>The email message</returns>
        MailMessage BuildEmailMessage(string templateCode, NameValueCollection tagValues, MailAddressCollection to, MailAddressCollection cc = null);

        /// <summary>
        /// The build email message
        /// </summary>
        /// <param name="templateId">The template id</param>
        /// <param name="tagValues">The list of tags values</param>
        /// <param name="to">TO list of to address</param>
        /// <param name="cc">CC list of cc address</param>
        /// <returns>The email message</returns>
        MailMessage BuildEmailMessage(int templateId, NameValueCollection tagValues, MailAddressCollection to, MailAddressCollection cc = null);

        /// <summary>
        /// The build email message
        /// </summary>
        /// <param name="template">The email template</param>
        /// <param name="tagValues">The list of tags values</param>
        /// <param name="to">TO list of to address</param>
        /// <param name="cc">CC list of cc address</param>
        /// <returns>The email message</returns>
        MailMessage BuildEmailMessage(EmailTemplate template, NameValueCollection tagValues, MailAddressCollection to, MailAddressCollection cc = null);

        /// <summary>
        /// The get array of tags strings
        /// </summary>
        /// <param name="template">The email template</param>
        /// <returns>The array of tag strings</returns>
        string[] GetTagsFromTemplate(EmailTemplate template);
    }
}
