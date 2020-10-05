namespace BBWT.UnitTests.Services
{
    using System.Configuration;
    using System.Net.Configuration;
    using System.Net.Mail;

    using BBWT.Data.Membership;
    using BBWT.Data.Settings;
    using BBWT.Services.Interfaces;
    using BBWT.Services.Messages;

    using Moq;

    using NUnit.Framework;

    /// <summary>
    /// Set of basic unit tests to try how it works
    /// </summary>
    [TestFixture]
    public class EmailSenderTests
    {
        private IEmailComposer emailComposer = null;
        private IEmailSender emailSender = null;

        /// <summary>
        /// Initializes tests set
        /// </summary>
        [TestFixtureSetUp]
        public void StartUp()
        {
            var config = new BBWTConfig { App = new AppConfig { Name = "Test Application" } };
            var user = new User { Name = "demo@bbconsult.co.uk", FirstName = "John", Surname = "Green" };

            var mockConfigService = new Mock<IConfigService>();
            mockConfigService.Setup(s => s.Settings).Returns(config);

            var mockMembershipService = new Mock<IMembershipService>();
            mockMembershipService.Setup(s => s.GetCurrentUser()).Returns(user);

            var mockEmailTemplateService = new Mock<IEmailTemplateService>();

            this.emailComposer = new EmailComposer(mockEmailTemplateService.Object, mockConfigService.Object, mockMembershipService.Object);
            this.emailSender = new EmailSender(mockConfigService.Object, this.emailComposer);

            System.Configuration.Configuration cfg = ConfigurationManager.OpenExeConfiguration(System.Configuration.ConfigurationUserLevel.None);
            SmtpSection smtpSection = cfg.GetSection("system.net.mailSettings.smtp") as SmtpSection;
            if (smtpSection != null)
            {
                try
                {
                    smtpSection.DeliveryFormat = SmtpDeliveryFormat.International;
                    smtpSection.DeliveryMethod = SmtpDeliveryMethod.SpecifiedPickupDirectory;
                }
                finally
                {
                    cfg.Save();
                }
            }
        }

        /// <summary>
        /// Ending tests set
        /// </summary>
        [TestFixtureTearDown]
        public void TearDown()
        {
        }

        /// <summary>
        /// Test
        /// </summary>
        [Test]
        public void Get()
        {
        }
}
}
