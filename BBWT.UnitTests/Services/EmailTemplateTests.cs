namespace BBWT.UnitTests.Services
{
    using BBWT.Data.Membership;
    using BBWT.Data.Settings;
    using BBWT.Services.Interfaces;
    using Moq;

    using NUnit.Framework;

    /// <summary>
    /// Email Template Tests
    /// </summary>
    [TestFixture]
    public class EmailTemplateTests
    {        
        /// <summary>
        /// StartUp test
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
        }

        /// <summary>
        /// TearDown test
        /// </summary>
        [TestFixtureTearDown]
        public void TearDown()
        {
        }
    }
}
