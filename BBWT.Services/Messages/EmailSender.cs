namespace BBWT.Services.Messages
{
    using System;
    using System.Collections.Specialized;
    using System.Diagnostics.CodeAnalysis;
    using System.Net.Mail;

    using BBWT.Services.Interfaces;

    /// <summary>
    /// The email sender.
    /// </summary>
    public class EmailSender : IEmailSender
    {
        private readonly IConfigService configService;
        private readonly IEmailComposer emailComposer;

        /// <summary>
        /// Initializes email sender.
        /// </summary>
        /// <param name="configService">The config service.</param>
        /// <param name="emailComposer">The email composer.</param>
        public EmailSender(IConfigService configService, IEmailComposer emailComposer)
        {
            this.configService = configService;
            this.emailComposer = emailComposer;
        }

        /// <summary>
        /// The build and send email.
        /// </summary>
        /// <param name="templateCode">The template code</param>
        /// <param name="tagValues">The tags values</param>
        /// <param name="toEmails">TO email address string</param>
        /// <param name="ccEmails">CC email address string</param>
        [SuppressMessage("StyleCop.CSharp.NamingRules", "SA1305:FieldNamesMustNotUseHungarianNotation", Justification = "Reviewed. Suppression is OK here.")]
        public void SendEmail(string templateCode, NameValueCollection tagValues, string toEmails, string ccEmails = null)
        {
            var mail = this.emailComposer.BuildEmailMessage(templateCode, tagValues, toEmails, ccEmails);

            this.SendEmail(mail);
        }

        /// <summary>
        /// The build and send email.
        /// </summary>
        /// <param name="templateCode">The template code</param>
        /// <param name="tagValues">The tags values</param>
        /// <param name="to">The to.</param>
        /// <param name="cc">The cc.</param>
        public void SendEmail(string templateCode, NameValueCollection tagValues, MailAddressCollection to, MailAddressCollection cc = null)
        {
            var mail = this.emailComposer.BuildEmailMessage(templateCode, tagValues, to, cc);

            this.SendEmail(mail);
        }

        /// <summary>
        /// The build and send email.
        /// </summary>
        /// <param name="subject">The subject.</param>
        /// <param name="body">The body.</param>
        /// <param name="from">The from.</param>
        /// <param name="to">The to.</param>
        /// <param name="cc">The cc.</param>
        public void SendEmail(string subject, string body, MailAddress from, MailAddressCollection to, MailAddressCollection cc = null)
        {
            var mail = this.emailComposer.BuildEmailMessage(subject, body, from, to, cc);

            this.SendEmail(mail);
        }

        /// <summary>
        /// The send email
        /// </summary>
        /// <param name="mailMessage">Email message.</param>
        public void SendEmail(MailMessage mailMessage)
        {
            if (mailMessage == null)
            {
                throw new ArgumentNullException("mailMessage");
            }

            using (var smtp = new SmtpClient())
            {
                smtp.DeliveryFormat = SmtpDeliveryFormat.International;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                if (this.configService.Settings.Email.SMTP != null)
                {
                    smtp.Host = this.configService.Settings.Email.SMTP;
                }
                else
                {
                    //smtp.Host = "mail.bbconsult.co.uk";
                    smtp.Host = "localhost";
                }

                smtp.Port = 25;
                smtp.UseDefaultCredentials = true;
                //smtp.Send(mailMessage);                
            }
        }        
    }
}
