namespace BBWT.Services.Classes
{
    using System.Linq;
    using System.Security.Principal;

    using BBWT.Data;
    using BBWT.Domain;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// TestServict implementation
    /// </summary>
    public class TestService : ITestService
    {
        private readonly IDataContext context;

        private readonly IPrincipal user;

        /// <summary>Constructs new instance of <see cref="TestService"/></summary>
        /// <param name="ctx">Data context</param>
        /// <param name="user">Current user</param>
        public TestService(IDataContext ctx, IPrincipal user)
        {
            this.context = ctx;
            this.user = user;
        }

        /// <summary>Get list of all products</summary>
        /// <returns>List of products</returns>
        public IQueryable<TestProduct> GetAllProducts()
        {
            return this.context.TestProducts;
        }

        /// <summary>Get single product instance</summary>
        /// <param name="id">Product ID</param>
        /// <returns>Product instance</returns>
        public TestProduct GetProductById(int id)
        {
            return this.context.TestProducts.Find(id);
        }
    }
}