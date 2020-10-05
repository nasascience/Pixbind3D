namespace BBWT.Services.Interfaces
{
    using System.Linq;

    using BBWT.Data;

    /// <summary>
    /// Test service interface
    /// </summary>
    public interface ITestService
    {
        #region Public Methods and Operators

        /// <summary>
        /// Get list of all products
        /// </summary>
        /// <returns>List of products</returns>
        IQueryable<TestProduct> GetAllProducts();

        /// <summary>Get single product by its ID</summary>
        /// <param name="id">product id</param>
        /// <returns>Product entity</returns>
        TestProduct GetProductById(int id);

        #endregion
    }
}
