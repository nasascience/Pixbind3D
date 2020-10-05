namespace BBWT.UnitTests
{
    using System.Linq;
    using BBWT.Data;
    using BBWT.Domain;
    using BBWT.FakeObjects;
    using BBWT.Services.Classes;
    using BBWT.Services.Interfaces;

    using Moq;

    using NUnit.Framework;

    /// <summary>
    /// UnitTestsSample
    /// </summary>
    [TestFixture]    
    public class UnitTestsSample
    {
        private ITestService service;

        /// <summary>
        /// Startup
        /// </summary>
        [TestFixtureSetUp]
        public void Startup()
        {
            var data = new FakeDbSet<TestProduct>
                           {
                               new TestProduct { Id = 1, Name = "Apple", Price = 100 },
                               new TestProduct { Id = 2, Name = "Orange", Price = 200 },
                               new TestProduct { Id = 3, Name = "Banana", Price = 300 }
                           };

            var context = new Mock<IDataContext>();
            context.Setup(c => c.TestProducts).Returns(data);

            this.service = new TestService(context.Object, null);
        }

        /// <summary>
        /// Get number of entities
        /// </summary>
        [Test]
        public void GetNumberOfEntities()
        {
            var cnt = this.service.GetAllProducts().Count();
            Assert.AreEqual(cnt, 3);
        }

        /// <summary>
        /// Check first product name
        /// </summary>
        [Test]
        public void CheckFirstProductName()
        {
            var product = this.service.GetProductById(1);
            Assert.AreEqual("Apple", product.Name);
        }

        /*
        [Test]
        public void CheckCommitedStateIfNotCommited()
        {
            Assert.Throws<DbUpdateException>(
                delegate
                    {
                        using (var context = new FakeDataContext())
                        {
                            context.TestProducts.Add(
                                new TestProduct() { Id = 1, Name = "Apple", Color = "Green", Size = 100, Weight = 200 });
                        }
                    });
        }

        [Test]
        public void CheckCommitedStateIfCommited()
        {
            Assert.DoesNotThrow(delegate
            {
                using (var context = new FakeDataContext())
                {
                    context.TestProducts.Add(
                        new TestProduct() { Id = 1, Name = "Apple", Color = "Green", Size = 100, Weight = 200 });
                    context.Commit();
                }
            });
        }

        [Test]
        public void CheckCommitedStateIfRolledBack()
        {
            Assert.DoesNotThrow(delegate
            {
                using (var context = new FakeDataContext())
                {
                    context.TestProducts.Add(
                        new TestProduct() { Id = 1, Name = "Apple", Color = "Green", Size = 100, Weight = 200 });
                    context.Rollback();
                }
            });
        }
         */
    }
}
