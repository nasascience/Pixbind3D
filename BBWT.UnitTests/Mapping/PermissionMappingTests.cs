namespace BBWT.UnitTests.Mapping
{
    using AutoMapper;

    using BBWT.Data.Membership;
    using BBWT.DTO.Membership;
    using BBWT.Web.App_Start;

    using NUnit.Framework;

    /// <summary>
    /// Set of mapping tests
    /// </summary>
    [TestFixture]
    public class PermissionMappingTests
    {
        /// <summary>
        /// Initializes tests set
        /// </summary>
        [TestFixtureSetUp]
        public void Startup()
        {
            MapperConfig.Initialize();
        }

        /// <summary>
        /// Check mapping of system permission
        /// </summary>
        [Test]
        public void SystemPermissionMapping()
        {
            var source = new Permission
            {
                Id = 1,
                Name = "PermissionName",
                Code = "PC",
                IsParameterised = false,
                ParameterName = "TestParam",
                SQL = "SQLText"
            };

            var destination = Mapper.Map<PermissionDTO>(source);

            Assert.AreEqual(destination.Id, source.Id);
            Assert.AreEqual(destination.Code, source.Code);
            Assert.AreEqual(destination.Name, source.Name);
            Assert.IsTrue(destination.IsSystem);
        }

        /// <summary>
        /// Check mapping of custom permission
        /// </summary>
        [Test]
        public void CustomPermissionMapping()
        {
            var source = new Permission
            {
                Id = 10000,
                Name = "PermissionName",
                Code = "PC",
                IsParameterised = false,
                ParameterName = "TestParam",
                SQL = "SQLText"
            };

            var destination = Mapper.Map<PermissionDTO>(source);

            Assert.AreEqual(destination.Id, source.Id);
            Assert.AreEqual(destination.Code, source.Code);
            Assert.AreEqual(destination.Name, source.Name);
            Assert.IsFalse(destination.IsSystem);
        }

        /// <summary>
        /// Check permission details mapping
        /// </summary>
        [Test]
        public void PermissionDetailsMapping()
        {
            var source = new Permission
            {
                Id = 10000,
                Name = "PermissionName",
                Code = "PC",
                IsParameterised = false,
                ParameterName = "TestParam",
                SQL = "SQLText"
            };

            var destination = Mapper.Map<PermissionDetailsDTO>(source);

            Assert.AreEqual(destination.Id, source.Id);
            Assert.AreEqual(destination.Code, source.Code);
            Assert.AreEqual(destination.Name, source.Name);
            Assert.AreEqual(destination.IsParameterised, source.IsParameterised);
            Assert.AreEqual(destination.ParameterName, source.ParameterName);
            Assert.AreEqual(destination.SQL, source.SQL);
        }

        /// <summary>
        /// Check permission details mapping
        /// </summary>
        [Test]
        public void PermissionDetailsDTOMapping()
        {
            var source = new PermissionDetailsDTO
            {
                Id = 10000,
                Name = "PermissionName",
                Code = "PC",
                IsParameterised = false,
                ParameterName = "TestParam",
                SQL = "SQLText"
            };

            var destination = Mapper.Map<Permission>(source);

            Assert.AreEqual(destination.Id, source.Id);
            Assert.AreEqual(destination.Code, source.Code);
            Assert.AreEqual(destination.Name, source.Name);
            Assert.AreEqual(destination.IsParameterised, source.IsParameterised);
            Assert.AreEqual(destination.ParameterName, source.ParameterName);
            Assert.AreEqual(destination.SQL, source.SQL);
        }
    }
}
