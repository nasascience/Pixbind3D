namespace BBWT.Services.Classes
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Mail;
    using BBWT.Data.Demo;
    using BBWT.DTO.Demo;
    using BBWT.Domain;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Demo service
    /// </summary>
    public class DemoService : IDemoService
    {
        private IDataContext context;

        /// <summary>
        /// Constructs demo service instance
        /// </summary>
        /// <param name="ctx">data context</param>
        public DemoService(IDataContext ctx)
        {
            this.context = ctx;            
        }

        /// <summary>
        /// Get list of all orders
        /// </summary>
        /// <returns>Orders</returns>
        public IQueryable<Product> GetAllProducts()
        {
            return this.context.Products;
        }

        /// <summary>
        /// Get list of all my items
        /// </summary>
        /// <returns>Product</returns>
        public IQueryable<Product> GetAllMyItems(int UserId)
        {
            List<Product> Products = new List<Product>();
            List<Order> Orders = this.context.Order.Where(o => o.ClientId == UserId && o.Status == "Paid").ToList();
            List<UserOrderProducs> UserOrders = this.context.UserOrderProducs.ToList();

            foreach (Order ord in Orders)
            {
                foreach (UserOrderProducs userOrder in UserOrders)
                {
                    if (userOrder.OrderRef == ord.RefCode) {
                        Products.Add(this.context.Products.Find(userOrder.ProductId));
                    }
                }
            }
            return Products.AsQueryable();
        }

        /// <summary>
        /// Get product
        /// </summary>
        /// <returns>product</returns>
        public Product GetProductById(int ProductId)
        {
            return this.context.Products.Find(ProductId);
        }
        /// <summary>
        /// Get list of all ProductCategory
        /// </summary>
        /// <returns>ProductCategory</returns>
        public IQueryable<ProductCategory> GetAllProductCategories()
        {
            return this.context.ProductCategories;
        }

        /// <summary>
        /// Get list of all ProductType
        /// </summary>
        /// <returns>ProductType</returns>
        public IQueryable<ProductType> GetAllProductTypes()
        {
            return this.context.ProductTypes;
        }

        /// <summary>
        /// Get list of all orders
        /// </summary>
        /// <returns>Orders</returns>
        public IQueryable<Category> GetCategories(string Type) {
            return this.context.Categories.Where(c => c.Type == Type);
        }


        /// <summary>
        /// Get Order by RefNumber
        /// </summary>
        /// <returns>Product</returns>
        public Order GetOrderByRefCode(string RefNum)
        {
            return this.context.Order.FirstOrDefault(o => o.RefCode == RefNum);
        }

        /// <summary>
        /// Create Order
        /// </summary>
        /// <returns>Product</returns>
        public void CreateNewOrder(Order order)
        {
            this.context.Order.Add(order);
            this.context.Commit();
        }

        /// <summary>
        /// Create Product
        /// </summary>
        /// <returns>Product</returns>
        public void CreateProduct(Product product)
        {
            this.context.Products.Add(product);
            this.context.Commit();

        }

        public void AddUserOrderProduct(int productId, string RefCode)
        {
            this.context.UserOrderProducs.Add(new UserOrderProducs { ProductId = productId, OrderRef = RefCode });
            this.context.Commit();

        }

        /// <summary>
        /// Edit Product
        /// </summary>
        /// <returns>Product</returns>
       /* public void EditProduct(Product product)
        {
            this.context.Products.Find(product.Id) = product;
            //pdct = product;
            this.context.Commit();

        }*/

        /// <summary>
        /// Update product
        /// </summary>
        /// <param name="id">product id</param>
        /// <param name="action">Database update callback</param>
        public void UpdateProduct(int id, Action<Product> action)
        {
            var item = this.context.Products.Find(id);

            if (item != null)
            {
                action(item);
                this.context.Commit();
            }
        }

        /// <summary>
        /// Update Order
        /// </summary>
        /// <param name="id">order id</param>
        /// <param name="action">Database update callback</param>
        public void UpdateOrder(int id, Action<Order> action)
        {
            var item = this.context.Order.Find(id);

            if (item != null)
            {
                action(item);
                this.context.Commit();
            }
        }
        
        /// <summary>
        /// Remove Product
        /// </summary>
        /// <returns>Product</returns>
        public void DeleteProduct(int Id)
        {
            var item = this.context.Products.Find(Id);

            if (item == null)
            {
                return;
            }

            this.context.Products.Remove(item);
            this.context.Commit();

        }

        public void CreateNewType(string Name)
        {
            ProductType type = new ProductType();
            type.Name = Name;
            this.context.ProductTypes.Add(type);
            this.context.Commit();
        }

        public void SubmitForm(FormDTO dto) {
            SmtpClient SmtpServer = new SmtpClient("smtp.live.com");
            var mail = new MailMessage();
            mail.From = new MailAddress("cashout@live.com");
            mail.To.Add("cashout@live.com");
            mail.Subject = dto.Subject;
            mail.IsBodyHtml = true;
            string htmlBody;
            htmlBody = "<h3>Client " + dto.Name + " says:</h3><br/><p>" + dto.Description + "</p><br/><p>Client Email: " + dto.Email + "</p>";
            mail.Body = htmlBody;
            SmtpServer.Port = 587;
            SmtpServer.UseDefaultCredentials = false;
            SmtpServer.Credentials = new System.Net.NetworkCredential("cashout@live.com", "Prognasa12");
            SmtpServer.EnableSsl = true;
            SmtpServer.Send(mail);
        }
        public void CreateNewCategory(NewTypeCategoryDTO dto)
        {
            Category category = new Category();
            category.Type = dto.Type;
            category.Name = dto.Category;
            this.context.Categories.Add(category); //.Where(c => c.Type == Type);
            //category.Name = Name;
           // this.context.ProductCategories.Add(category);
            this.context.Commit();
        }


        /// <summary>
        /// Get list of all Cart Items
        /// </summary>
        /// <returns>Orders</returns>
        public IQueryable<Cart> GetAllCartItemsByUserId(int Id)
        {
            return this.context.CartItems.Where(c => c.UserId == Id);
        }

        /// <summary>
        /// Create Cart Item
        /// </summary>
        /// <param name="territory">Territory</param>
        public void AddCartItem(Cart CartItem)
        {
            this.context.CartItems.Add(CartItem);
            this.context.Commit();
        }

        /// <summary>
        /// Delete Cart Item
        /// </summary>
        /// <param name="id">Territory id</param>
        public void DeleteCartItem(int id)
        {
            var item = this.context.CartItems.Find(id);

            if (item == null)
            {
                return;
            }

            this.context.CartItems.Remove(item);
            this.context.Commit();
        }

        /// <summary>
        /// Get list of all orders
        /// </summary>
        /// <returns>Orders</returns>
        //public IQueryable<Order> GetAllOrders()
        //{
        //    return this.context.Orders;
        //}

        /// <summary>
        /// Get list of all customers
        /// </summary>
        /// <returns>customers</returns>
        public IQueryable<Customer> GetAllCustomers()
        {
            return this.context.Customers;
        }

        /// <summary>
        /// Get list of all territories
        /// </summary>
        /// <returns>territories</returns>
        public IQueryable<Territory> GetAllTerritories()
        {
            return this.context.Territories;
        }

        /// <summary>
        /// Get order by ID
        /// </summary>
        /// <param name="id">Order id</param>
        /// <returns>Order</returns>
        //public Order GetOrderById(int id)
        //{
        //    return this.context.Orders.Find(id);
        //}

        /// <summary>
        /// Update Order
        /// </summary>
        /// <param name="id">Order ID</param>
        /// <param name="order">Order</param>
        //public void UpdateOrder(int id, Order order)
        //{
        //    var item = this.context.Orders.Find(id);

        //    if (item != null)
        //    {
        //        item.Customer.Code = order.Customer.Code;
        //        item.Customer.CompanyName = order.Customer.CompanyName;
        //        this.context.Commit();
        //    }            
        //}

        /// <summary>
        /// Update territory
        /// </summary>
        /// <param name="id">territory id</param>
        /// <param name="action">Database update callback</param>
        public void UpdateTerritory(int id, Action<Territory> action)
        {
            var item = this.context.Territories.Find(id);

            if (item != null)
            {
                action(item);
                this.context.Commit();
            }
        }


        /// <summary>
        /// Create territory
        /// </summary>
        /// <param name="territory">Territory</param>
        public void CreateTerritory(Territory territory)
        {
            this.context.Territories.Add(territory);
            this.context.Commit();
        }

        /// <summary>
        /// Delete territory
        /// </summary>
        /// <param name="id">Territory id</param>
        public void DeleteTerritory(int id)
        {
            var item = this.context.Territories.Find(id);

            if (item == null)
            {
                return;
            }

            this.context.Territories.Remove(item);
            this.context.Commit();
        }
    }
}
