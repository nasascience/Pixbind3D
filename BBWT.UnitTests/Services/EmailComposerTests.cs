namespace BBWT.UnitTests
{
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Net.Mail;

    using BBWT.Data.Membership;
    using BBWT.Data.Settings;
    using BBWT.Data.Template;
    using BBWT.Services.Interfaces;
    using BBWT.Services.Messages;

    using Moq;

    using NUnit.Framework;

    /// <summary>
    /// Set of basic unit tests to try how it works
    /// </summary>
    [TestFixture]
    public class EmailComposerTests
    {
        private EmailComposer composer;

        private EmailTemplate template;

        /// <summary>
        /// Initializes tests set
        /// </summary>
        [TestFixtureSetUp]
        public void Startup()
        {
            this.template = new EmailTemplate
            {
                Id = 1,
                Code = "test",
                Title = "title",
                Subject = "#$AppName#",
                IsSystem = true,
                From = "#$UserEmail#",
                Notes = "Just a note",
                Message = "#$UserName#",
                Parameters = new List<TemplateParameter>()
            };

            var param = new TemplateParameter { Id = 10, Title = "Custom", Notes = "Template note", Template = this.template };

            this.template.Parameters.Add(param);

            var config = new BBWTConfig { App = new AppConfig { Name = "Test Application" } };
            var user = new User { Name = "demo@bbconsult.co.uk", FirstName = "John", Surname = "Green" };

            var templateService = new Mock<IEmailTemplateService>();
            var configService = new Mock<IConfigService>();
            var membershipService = new Mock<IMembershipService>();

            templateService.Setup(s => s.GetTemplateByCode("test")).Returns(this.template);
            membershipService.Setup(s => s.GetCurrentUser()).Returns(user);
            configService.Setup(s => s.Settings).Returns(config);

            this.composer = new EmailComposer(templateService.Object, configService.Object, membershipService.Object);
        }

        /// <summary>
        /// Test if composer can get all required tags from template
        /// </summary>
        [Test]
        public void GetTagsFromTemplate()
        {
            var tags = this.composer.GetTagsFromTemplate(this.template);
            Assert.AreEqual(3, tags.Length);
            Assert.IsTrue(tags.ToList().Any(it => it == "$AppName"));
            Assert.IsTrue(tags.ToList().Any(it => it == "$UserEmail"));
            Assert.IsTrue(tags.ToList().Any(it => it == "$UserName"));
        }

        /// <summary>
        /// Check if composer can build message directly
        /// </summary>
        [Test]
        public void BuildEmailMessageDirectly()
        {
            var res = this.composer.BuildEmailMessage(
                "subj",
                "body",
                new MailAddress("demo@bbconsult.co.uk"),
                new MailAddressCollection { new MailAddress("test@bbconsult.co.uk") });

            Assert.AreEqual("demo@bbconsult.co.uk", res.From.Address);
            Assert.AreEqual("subj", res.Subject);
            Assert.AreEqual("body", res.Body);
        }

        /// <summary>
        /// Check if composer can build message directly
        /// </summary>
        [Test]
        public void BuildEmailMessageFromTemplate()
        {
            var res = this.composer.BuildEmailMessage(
                "test", null, new MailAddressCollection { new MailAddress("test@bbconsult.co.uk") });

            Assert.AreEqual("demo@bbconsult.co.uk", res.From.Address);
            Assert.AreEqual("Test Application", res.Subject);
            Assert.AreEqual("John Green", res.Body);
        }
    }
}