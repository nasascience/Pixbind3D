namespace BBWT.UnitTests
{
    using System;

    using NUnit.Framework;

    /// <summary>
    /// Set of basic unit tests to try how it works
    /// </summary>
    [TestFixture]
    public class BasicTests
    {
        /// <summary>
        /// Keeps initialization state
        /// </summary>
        private bool isInitialized;

        /// <summary>
        /// Initializes tests set
        /// </summary>
        [TestFixtureSetUp]
        public void Startup()
        {
            this.isInitialized = true;
        }

        /// <summary>
        /// Checks initialization state
        /// </summary>
        [Test]
        public void CheckInitializationState()
        {
            Assert.IsTrue(this.isInitialized);
        }

        /// <summary>
        /// Test which always passes
        /// </summary>
        [Test]
        public void SomePassingTest()
        {
            Assert.AreEqual(5, 5);
        }

        /// <summary>
        /// Sample about exceptions test
        /// </summary>
        [Test]
        [ExpectedException(typeof(Exception), ExpectedMessage = "Just a test")]
        public void ExceptionsTest()
        {
            throw new Exception("Just a test");
        }
    }
}
