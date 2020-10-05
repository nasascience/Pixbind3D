namespace BBWT.Services.Messages
{
    using System.Collections.Specialized;
    using System.Diagnostics.CodeAnalysis;
    using System.Net.Mail;

    using BBWT.Data.Template;

    /// <summary>
    /// The EmailSender interface.
    /// </summary>
    public interface IEmailSender
    {
        /// <summary>
        /// The send email.
        /// </summary>
        /// <param name="subject">The subject.</param>
        /// <param name="body">The body.</param>
        /// <param name="from">The from.</param>
        /// <param name="to">The to.</param>
        /// <param name="cc">The cc.</param>
        void SendEmail(string subject, string body, MailAddress from, MailAddressCollection to, MailAddressCollection cc);

        /// <summary>
        /// The build and send email.
        /// </summary>
        /// <param name="templateCode">The template code</param>
        /// <param name="tagValues">The tags values</param>
        /// <param name="toEmails">TO email address string</param>
        /// <param name="ccEmails">CC email address string</param>
        [SuppressMessage("StyleCop.CSharp.NamingRules", "SA1305:FieldNamesMustNotUseHungarianNotation", Justification = "Reviewed. Suppression is OK here.")]
        void SendEmail(string templateCode, NameValueCollection tagValues, string toEmails, string ccEmails);

        /// <summary>
        /// The build and send email.
        /// </summary>
        /// <param name="templateCode">The template code</param>
        /// <param name="tagValues">The tags values</param>
        /// <param name="to">The to.</param>
        /// <param name="cc">The cc.</param>
        void SendEmail(string templateCode, NameValueCollection tagValues, MailAddressCollection to, MailAddressCollection cc);

        /// <summary>
        /// The send email
        /// </summary>
        /// <param name="mailMessage">The email message</param>
        void SendEmail(MailMessage mailMessage);
    }
}
