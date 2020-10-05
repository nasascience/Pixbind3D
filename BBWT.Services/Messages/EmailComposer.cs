namespace BBWT.Services.Messages
{
    using System;
    using System.Collections.Generic;
    using System.Collections.Specialized;
    using System.Diagnostics.CodeAnalysis;
    using System.Globalization;
    using System.Linq;
    using System.Net.Mail;
    using System.Text.RegularExpressions;

    using BBWT.Data.Membership;
    using BBWT.Data.Template;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Email composer: build template-based email text
    /// </summary>
    public class EmailComposer : IEmailComposer
    {
        private readonly IEmailTemplateService templateService;

        private readonly IConfigService configService;

        private readonly IMembershipService membershipService;

        private readonly Regex tagExtractor = new Regex(@"#(\$\w+)#", RegexOptions.Compiled);

        /// <summary>The Email composer</summary>
        /// <param name="templateService">Templates service</param>
        /// <param name="config">Configurator</param>
        /// <param name="membership">Membership service</param>
        public EmailComposer(IEmailTemplateService templateService, IConfigService config, IMembershipService membership)
        {
            this.templateService = templateService;
            this.configService = config;
            this.membershipService = membership;
        }

        /// <summary>
        /// The build email message
        /// </summary>
        /// <param name="subject">The subject.</param>
        /// <param name="body">The message body.</param>
        /// <param name="from">The address From</param>
        /// <param name="to">The address list To.</param>
        /// <param name="cc">The address list cc.</param>
        /// <returns>The Email message.</returns>
        public MailMessage BuildEmailMessage(string subject, string body, MailAddress from, MailAddressCollection to, MailAddressCollection cc = null)
        {
            var mail = new MailMessage 
            {
                Subject = subject,
                Body = body,
                From = from,
                IsBodyHtml = true
            };

            foreach (var mailAddress in to)
            {
                mail.To.Add(mailAddress);
            }

            if (cc != null)
            {
                foreach (var mailAddress in cc)
                {
                    mail.CC.Add(mailAddress);
                }
            }

            if (!string.IsNullOrEmpty(this.configService.Settings.Support.EmailAddress1))
            {
                mail.Bcc.Add(new MailAddress(this.configService.Settings.Support.EmailAddress1));
            }

            if (!string.IsNullOrEmpty(this.configService.Settings.Support.EmailAddress2))
            {
                mail.Bcc.Add(new MailAddress(this.configService.Settings.Support.EmailAddress2));
            }

            if (!string.IsNullOrEmpty(this.configService.Settings.Support.EmailAddress3))
            {
                mail.Bcc.Add(new MailAddress(this.configService.Settings.Support.EmailAddress3));
            }

            if (!string.IsNullOrEmpty(this.configService.Settings.Support.EmailAddress4))
            {
                mail.Bcc.Add(new MailAddress(this.configService.Settings.Support.EmailAddress4));
            }

            return mail;
        }

        /// <summary>
        /// The build email message
        /// </summary>
        /// <param name="templateCode">The template code</param>
        /// <param name="tagValues">The tags values</param>
        /// <param name="toEmails">The TO email address string</param>
        /// <param name="ccEmails">The CC email address string</param>
        /// <returns>The email message</returns>
        [SuppressMessage("StyleCop.CSharp.NamingRules", "SA1305:FieldNamesMustNotUseHungarianNotation", Justification = "Reviewed. Suppression is OK here.")]
        public MailMessage BuildEmailMessage(string templateCode, NameValueCollection tagValues, string toEmails, string ccEmails = null)
        {
            var toCollection = this.BuildAddressCollection(toEmails);
            var ccCollection = this.BuildAddressCollection(ccEmails);

            return this.BuildEmailMessage(templateCode, tagValues, toCollection, ccCollection);
        }

        /// <summary>
        /// The build email message
        /// </summary>
        /// <param name="templateCode">The template code</param>
        /// <param name="tagValues">The tags values</param>
        /// <param name="to">The address list To.</param>
        /// <param name="cc">The address list cc.</param>
        /// <returns>The email message</returns>
        public MailMessage BuildEmailMessage(string templateCode, NameValueCollection tagValues, MailAddressCollection to, MailAddressCollection cc = null)
        {
            var template = this.templateService.GetTemplateByCode(templateCode);
            return template != null ? this.BuildEmailMessage(template, tagValues, to, cc) : null;
        }

        /// <summary>
        /// The build email message
        /// </summary>
        /// <param name="templateId">The template id</param>
        /// <param name="tagValues">THe tags values</param>
        /// <param name="to">The address list To.</param>
        /// <param name="cc">The address list cc.</param>
        /// <returns>The Email message.</returns>
        public MailMessage BuildEmailMessage(int templateId, NameValueCollection tagValues, MailAddressCollection to, MailAddressCollection cc = null)
        {
            var template = this.templateService.GetTemplateById(templateId);
            return template != null ? this.BuildEmailMessage(template, tagValues, to, cc) : null;
        }

        /// <summary>
        /// The build email message
        /// </summary>
        /// <param name="template">The EmailTemplate</param>
        /// <param name="tagValues">The tags values</param>
        /// <param name="to">The address list To.</param>
        /// <param name="cc">The address list cc.</param>
        /// <returns>The Email message.</returns>
        public MailMessage BuildEmailMessage(EmailTemplate template, NameValueCollection tagValues, MailAddressCollection to, MailAddressCollection cc = null)
        {
            var from = string.Empty;
            var subject = string.Empty;
            var body = string.Empty;

            from = this.BuildStringFromTemplate(template.From, tagValues);
            subject = this.BuildStringFromTemplate(template.Subject, tagValues);
            body = this.BuildStringFromTemplate(template.Message, tagValues);

            return this.BuildEmailMessage(subject, body, new MailAddress(from), to, cc);
        }

        /// <summary>
        /// The GetTagsFromTemplate
        /// </summary>
        /// <param name="template">The email template</param>
        /// <returns>The array of tag strings</returns>
        public string[] GetTagsFromTemplate(EmailTemplate template)
        {
            var tags = new List<string>();

            var fromTags = this.GetTagList(template.From);
            var subjectTags = this.GetTagList(template.Subject);
            var messageTags = this.GetTagList(template.Message);

            tags.AddRange(messageTags);
            tags.AddRange(subjectTags.Except(messageTags));
            tags.AddRange(fromTags.Except(messageTags));

            return tags.OrderBy(s => s).ToArray();
        }

        private MailAddressCollection BuildAddressCollection(string emailValues)
        {
            var collection = new MailAddressCollection();

            if (!string.IsNullOrEmpty(emailValues))
            {
                var values = emailValues.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (var value in values)
                {
                    collection.Add(new MailAddress(value));
                }
            }

            return collection;
        }

        /// <summary>
        ///  The bild string from templated string
        /// </summary>
        /// <param name="templateString">The templated string</param>
        /// <param name="tagValues">The tags values</param>
        /// <returns>The result tring</returns>
        private string BuildStringFromTemplate(string templateString, NameValueCollection tagValues)
        {
            if (tagValues == null)
            {
                tagValues = new NameValueCollection();
            }

            this.PrepareSystemTags(tagValues);  

            var tags = this.GetTagList(templateString);
            foreach (var tag in tags)
            {
                var tagValue = tagValues[tag];
                templateString = templateString.Replace("#" + tag + "#", tagValue);
            }

            return templateString;
        }

        private void PrepareSystemTags(NameValueCollection tagValues)
        {
            var user = this.membershipService.GetCurrentUser()
                       ?? new User { Name = "<unknown>", FirstName = "<unknown>", Surname = "<unknown>" };

            if (tagValues["$AppName"] == null)
            {
                tagValues["$AppName"] = this.configService.Settings.App.Name;
            }

            if (tagValues["$DateTime"] == null)
            {
                tagValues["$DateTime"] = DateTime.Now.ToString("dd/MM/yyyy HH:MM", CultureInfo.GetCultureInfo("en-GB"));
            }

            if (user != null)
            {
                if (tagValues["$UserName"] == null)
                {
                    tagValues["$UserName"] = string.Format("{0} {1}", user.FirstName, user.Surname);
                }

                if (tagValues["$UserFirstName"] == null)
                {
                    tagValues["$UserFirstName"] = user.FirstName;
                }

                if (tagValues["$UserSurname"] == null)
                {
                    tagValues["$UserSurname"] = user.Surname;
                }

                if (tagValues["$UserEmail"] == null)
                {
                    tagValues["$UserEmail"] = user.Name;
                }
            }
        }

        private string[] GetTagList(string source)
        {
            var tag = string.Empty;
            var tags = new List<string>();

            if (!string.IsNullOrEmpty(source))
            {
                var matchs = this.tagExtractor.Matches(source);
                foreach (Match match in matchs)
                {
                    if (match.Groups.Count == 2)
                    {
                        tag = match.Groups[1].Value;
                        if (!tags.Contains(tag))
                        {
                            tags.Add(tag);
                        }
                    }
                }
            }

            return tags.ToArray();
        }
    }
}
