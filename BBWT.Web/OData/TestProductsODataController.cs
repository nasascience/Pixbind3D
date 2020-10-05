namespace BBWT.Web.OData
{
    using System.Linq;
    using System.Web.Http.OData;

    using BBWT.Data;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Products collection OData controller
    /// </summary>
    public class TestProductsODataController : ODataController
    {
        private ITestService productsService;

        /// <summary>
        /// Constructs new instance of <see cref="TestProductsODataController"/>
        /// </summary>
        /// <param name="productsService">Test service</param>
        public TestProductsODataController(ITestService productsService)
        {
            this.productsService = productsService;
        }

        /// <summary>
        /// Get list of Groups
        /// </summary>
        /// <returns>List of Groups</returns>
        public IQueryable<TestProduct> Get()
        {
            return this.productsService.GetAllProducts();
        }
    }
}