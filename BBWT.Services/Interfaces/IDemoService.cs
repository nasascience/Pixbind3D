namespace BBWT.Services.Interfaces
{
    using System;
    using System.Linq;
    using BBWT.DTO.Demo;
    using BBWT.Data.Demo;

    /// <summary>
    /// Demo service interface
    /// </summary>
    public interface IDemoService
    {
        void SubmitForm(FormDTO dto);
        void CreateNewType(string Name);
        void CreateNewCategory(NewTypeCategoryDTO dto);
        void DeleteProduct(int Id);

        /// <summary>
        /// Create Product
        /// </summary>
        /// <returns>Product</returns>
        void CreateProduct(Product product);

        /// <summary>
        /// Add User Order Product
        /// </summary>
        /// <returns>Product</returns>
        void AddUserOrderProduct(int productId, string orderId);

        /// <summary>
        /// Get list of all my items
        /// </summary>
        /// <returns>Product</returns>
        IQueryable<Product> GetAllMyItems(int UserId);

        /// <summary>
        /// Create Order
        /// </summary>
        /// <returns>Product</returns>
        void CreateNewOrder(Order order);

        /// <summary>
        /// Get Order By RefNumber
        /// </summary>
        /// <returns>Product</returns>
        Order GetOrderByRefCode(string RefNum);

        /// <summary>
        /// Edit Product
        /// </summary>
        /// <returns>Product</returns>
        //void EditProduct(Product product);
        void UpdateProduct(int id, Action<Product> action);

        /// <summary>
        /// Edit Order
        /// </summary>
        /// <returns>ORder</returns>
        //void EditProduct(Order order);
        void UpdateOrder(int id, Action<Order> action);

        /// <summary>
        /// Get list of all products
        /// </summary>
        /// <returns>Orders</returns>
        IQueryable<Product> GetAllProducts();

        /// <summary>
        /// Get product
        /// </summary>
        /// <returns>product</returns>
        Product GetProductById(int ProductId);

        IQueryable<Category> GetCategories(string Type);

        /// <summary>
        /// Get list of all ProductCategory
        /// </summary>
        /// <returns>ProductCategory</returns>
        IQueryable<ProductCategory> GetAllProductCategories();

        /// <summary>
        /// Get list of all ProductType
        /// </summary>
        /// <returns>ProductType</returns>
        IQueryable<ProductType> GetAllProductTypes();

        /// <summary>
        /// Get CartItem list by userId
        /// </summary>
        /// <returns>List of orders</returns>
        IQueryable<Cart> GetAllCartItemsByUserId(int Id);

        /// <summary>
        /// Create Cart Item
        /// </summary>
        /// <param name="territory">Territory</param>
        void AddCartItem(Cart CartItem);

        /// <summary>
        /// Delete Cart Item
        /// </summary>
        /// <param name="id">Territory id</param>
        void DeleteCartItem(int id);

        /// <summary>
        /// Get orders list
        /// </summary>
        /// <returns>List of orders</returns>
        //IQueryable<Order> GetAllOrders();

        /// <summary>
        /// Get customers list
        /// </summary>
        /// <returns>List of customers</returns>
        IQueryable<Customer> GetAllCustomers();

        /// <summary>
        /// Get territories list
        /// </summary>
        /// <returns>List of territories</returns>
        IQueryable<Territory> GetAllTerritories();

        /// <summary>
        /// Get order by id
        /// </summary>
        /// <param name="id">Order id</param>
        /// <returns>Order</returns>
        //Order GetOrderById(int id);

        /// <summary>
        /// Update order
        /// </summary>
        /// <param name="id">Order ID</param>
        /// <param name="order">Order</param>
       // void UpdateOrder(int id, Order order);

        /// <summary>
        /// Update territory
        /// </summary>
        /// <param name="id">Territory ID</param>
        /// <param name="action">Data update callback</param>
        void UpdateTerritory(int id, Action<Territory> action);

        /// <summary>
        /// Create territory
        /// </summary>
        /// <param name="territory">Territory</param>
        void CreateTerritory(Territory territory);

        /// <summary>
        /// Delete territory by id
        /// </summary>
        /// <param name="id">territory id</param>
        void DeleteTerritory(int id);
    }
}
