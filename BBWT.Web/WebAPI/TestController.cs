namespace BBWT.Web.WebApi
{
    using System;
    using System.Linq;
    using System.Web.Http;

    using BBWT.Data;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Test collection API controller
    /// </summary>
    public class TestController : ApiController
    {
        private readonly ITestService service;

        /// <summary>
        /// Constructs new instance of <see cref="TestController"/>
        /// </summary>
        /// <param name="svc">Test service instance</param>
        public TestController(ITestService svc)
        {
            if (svc == null)
            {
                throw new ArgumentNullException("svc", "Argument should not be null");
            }

            this.service = svc;
        }

        ////[Route("~/api/test-paged")]
        ////public PageResult<TestProduct> GetAllProductsPaged(ODataQueryOptions<TestProduct> options)
        ////{
        ////    ODataQuerySettings settings = new ODataQuerySettings()
        ////    {
        ////        PageSize = 2
        ////    };
        ////    IQueryable results = options.ApplyTo(this.GetAllProducts(), settings);

        ////    return new PageResult<TestProduct>(
        ////        results as IEnumerable<TestProduct>, 
        ////        Request.GetNextPageLink(), 
        ////        Request.GetInlineCount());
        ////}

        /// <summary>
        /// returns query object which helps to get full collection of objects available for current user
        /// </summary>
        /// <returns>List of products</returns>
        public IQueryable<TestProduct> GetAllProducts()
        {
            return this.service.GetAllProducts();
        }

        /// <summary>Returns single product by id</summary>
        /// <param name="id">product id</param>
        /// <returns>product</returns>
        public TestProduct GetProductById(int id)
        {
            return this.service.GetAllProducts().FirstOrDefault(p => p.Id == id);
        }
    }
}