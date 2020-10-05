namespace BBWT.UnitTests.Mapping
{
    using System.Collections.Generic;
    using System.Collections.ObjectModel;

    using AutoMapper;

    using BBWT.Data.Membership;
    using BBWT.DTO;
    using BBWT.DTO.Membership;
    using BBWT.Web.App_Start;

    using NUnit.Framework;

    /// <summary>
    /// Check Role mapping
    /// </summary>
    [TestFixture]
    public class RoleMappingTests
    {
        /// <summary>
        /// Initialize tests
        /// </summary>
        [TestFixtureSetUp]
        public void Startup()
        {
            MapperConfig.Initialize();
        }

        /// <summary>
        /// Role to RoleListItemDTO mapping
        /// </summary>
        [Test]
        public void RoleMapping()
        {
            var source = new Role { Id = 1, Name = "RoleName" };

            var destination = Mapper.Map<RolesListItemDTO>(source);

            Assert.AreEqual(destination.Id, source.Id);
            Assert.AreEqual(destination.Name, source.Name);
        }

        /// <summary>
        /// Role to RoleDTO mapping
        /// </summary>
        [Test]
        public void RoleDetailsMapping()
        {
            var source = new Role
            {
                Id = 1,
                Name = "RoleName",
                Permissions =
                    new Collection<AssignedPermission> 
                    { 
                        new AssignedPermission 
                        { 
                            Id = 1, LinkedPermission = new Permission
                            {
                                Id = 1, Name = "Perm1"                             
                            } 
                        } 
                    }
            };

            var destination = Mapper.Map<RoleDTO>(source);

            Assert.AreEqual(destination.Id, source.Id);
            Assert.AreEqual(destination.Name, source.Name);
            Assert.AreEqual(destination.Permissions.Count, source.Permissions.Count);
            Assert.AreEqual(destination.Permissions[0].Id, 1);
        }

        /// <summary>
        /// RoleDTO to Role mapping
        /// </summary>
        [Test]
        public void RoleDetailsDTOMapping()
        {
            var source = new RoleDTO
            {
                Id = 1,
                Name = "RoleName",
                Permissions =
                    new List<CheckBoxItemDTO> { new CheckBoxItemDTO { Id = 1, IsChecked = false } }
            };

            var destination = Mapper.Map<Role>(source);

            Assert.AreEqual(destination.Id, source.Id);
            Assert.AreEqual(destination.Name, source.Name);
            Assert.IsNull(destination.Permissions);
        }
    }
}
