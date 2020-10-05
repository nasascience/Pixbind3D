  namespace BBWT.Web.WebAPI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using BBWT.Data.Demo;
    using BBWT.Data.Membership;
    using BBWT.DTO.Demo;
    using BBWT.Services.Interfaces;

    using TwoCheckout;
    using System.Web;
    /// <summary>
    /// Demo Controller
    /// </summary>
    public class ProductsController : ApiController
    {
        private readonly IDemoService service;
        private readonly IMembershipService membershipService;
        private readonly IMappingEngine mapper;

        /// <summary>
        /// Constructs demo controller object
        /// </summary>
        /// <param name="svc">Service</param>
        /// <param name="map">Mapper</param>
        public ProductsController(IDemoService svc, IMappingEngine map, IMembershipService membershipService)
        {
            this.service = svc;
            this.mapper = map;
            this.membershipService = membershipService;
        }

        /// <summary>
        /// Get all customers from repository
        /// </summary>
        /// <returns>Customers list</returns>
        public IQueryable<BBWT.Data.Demo.Product> GetAllProducts(string Type)
        {

            IQueryable<BBWT.Data.Demo.Product> AllProducts = this.service.GetAllProducts().Where(p => p.Type == Type);
            return AllProducts;           
        }


        /// <summary>
        /// Get Char Category
        /// </summary>
        public IQueryable<Category> GetCategories(string Type)
        {
            return this.service.GetCategories(Type);
        }

        /// <summary>
        /// Approved Link - Check Bought Products
        /// </summary>
        //[HttpGet]
        public IQueryable<BBWT.Data.Demo.Product> GetAllUserItems()
        {
            var UserId = this.membershipService.GetCurrentUserId();
            IQueryable<BBWT.Data.Demo.Product> AllProducts = this.service.GetAllMyItems(UserId);
            //IQueryable<BBWT.Data.Demo.Product> AllProducts = this.service.GetAllProducts().Where(p => p.Type == "Assets");
            return AllProducts;     
        }

        public IQueryable<ProductCategory> GetAllProductCategories()
        {
            return this.service.GetAllProductCategories();
        }

        public IQueryable<ProductType> GetAllProductTypes()
        {
            return this.service.GetAllProductTypes();
        }

        /// <summary>
        /// Save Product
        /// </summary>
        /// <param name="dto">Product dto</param>
        [HttpPost]
        public void EditProduct(ProductDataDTO dto)
        {
            //var product = this.mapper.Map<Product>(dto);
            //this.service.EditProduct(product);
            //UpdateProduct(int id, Action<Product> action);
            this.service.UpdateProduct(dto.Id, (BBWT.Data.Demo.Product db) =>
                {
                    //db.Title = dto.Title;
                    db.Downloads = dto.Downloads;
                });
        }

        /// <summary>
        /// RemoveClearCart
        /// </summary>
        [HttpGet]
        public bool RemoveClearCart()
        {

            var UserId = this.membershipService.GetCurrentUserId();
            //remove cart items
            List<Cart> UserCart = this.service.GetAllCartItemsByUserId(UserId).ToList();
            foreach (Cart Item in UserCart)
            {
                this.service.DeleteCartItem(Item.Id);
            }

            return true;
        }

        /// <summary>
        /// CheckPurchase
        /// </summary>
        /// <param name="dto">strdto</param>
        [HttpGet]
        public bool CheckPurchase(string strDto)
        {
            //string path = HttpRequestMessage request.Headers.Host // HttpContext.Current.Request.Url.AbsolutePath;
            var UserId = this.membershipService.GetCurrentUserId();
            bool result = false;
            bool TwoCheckOutResult = false;

            try
            {
                OrderDTO NewOrder = new OrderDTO();
                NewOrder.RefCode = strDto.Split('*')[0];
                NewOrder.Key = strDto.Split('*')[1];
                NewOrder.Email = strDto.Split('*')[2];
                NewOrder.OrderNumber = strDto.Split('*')[3];
                NewOrder.CurrencyCode = strDto.Split('*')[4];
                NewOrder.InvoiceId = strDto.Split('*')[5];
                NewOrder.Total = float.Parse(strDto.Split('*')[6], System.Globalization.CultureInfo.InvariantCulture);
                NewOrder.CreditCardProcessed = (strDto.Split('*')[7] == "Y") ? true : false;  //strDto.Split('*')[7];
                NewOrder.CardHolderName = strDto.Split('*')[8];
                NewOrder.ClientId = UserId;

                TwoCheckoutConfig.SecretWord = "OTI0OWQ1ZTYtOTkwMi00NGNhLWE5ZDAtMTIzMWQ0OTVjY2Fh";
                TwoCheckoutConfig.SellerID = "202853627";

                var Return = new ReturnService();
                var Args = new ReturnCheckServiceOptions();
                Args.total = strDto.Split('*')[6];// "1.00";
                Args.order_number = NewOrder.OrderNumber;// Request.Params["order_number"];
                Args.key = NewOrder.Key;// Request.Params["key"];
                TwoCheckOutResult = Return.Check(Args);


                if (TwoCheckOutResult)
                {
                    Order PostedOrder = PostedOrder = this.service.GetOrderByRefCode(NewOrder.RefCode);
                    if (PostedOrder != null)
                    {
                        //if (PostedOrder.ClientId == UserId)
                        //{
                            //Edit Found Order
                            this.service.UpdateOrder(PostedOrder.Id, (Order orderdb) =>
                            {
                                orderdb.Key = NewOrder.Key;
                                orderdb.OrderNumber = NewOrder.OrderNumber;
                                orderdb.CurrencyCode = NewOrder.CurrencyCode;
                                orderdb.InvoiceId = NewOrder.InvoiceId;
                                orderdb.Total = NewOrder.Total;
                                orderdb.CreditCardProcessed = NewOrder.CreditCardProcessed;
                                orderdb.CardHolderName = NewOrder.CardHolderName;
                                orderdb.Status = "Paid";
                                
                            });
                    
                            result = true;

                            //remove cart items
                            if (!PostedOrder.DirectPay)
                            {
                                List<Cart> UserCart = this.service.GetAllCartItemsByUserId(PostedOrder.ClientId).ToList();
                                foreach (Cart Item in UserCart)
                                {
                                    this.service.DeleteCartItem(Item.Id);
                                }
                            }                           
                        //}
                    }
                }

            }
            catch {
                result = false;
            }

            return result;
        }


        /// <summary>
        /// Direct Pay
        /// </summary>
        /// <param name="dto">Direct Pay</param>
        [HttpPost]
        public Order DirectPay(ProductDataDTO dto)
        {
            int UserId = this.membershipService.GetCurrentUserId();
            Order order = new Order();
            //order = null;
            //Create Order
            if (UserId > 0)
            {
            
                User user = this.membershipService.GetUserById(this.membershipService.GetCurrentUserId());

               /* BBWT.Data.Demo.Product prd = new BBWT.Data.Demo.Product();
                prd = this.service.GetProductById(dto.Id);
                List<Data.Demo.Product> ProductList = new List<Data.Demo.Product>();
                ProductList.Add(prd);*/

                try
                {
                    order.RefCode = Guid.NewGuid().ToString();
                    order.ClientId = this.membershipService.GetCurrentUserId();
                    order.Email = user.Name;
                    order.Total = dto.Price;
                    order.Qty = 1;
                    order.DirectPay = true;
                    order.Status = "Submitted";
                    //order.DirectPayItemId = dto.Id;
                    //order.Products = ProductList;

                    //Generate Order
                    this.service.CreateNewOrder(order);

                    //Add Prouct To clients ItemsList
                    this.service.AddUserOrderProduct(dto.Id, order.RefCode);
                }
                catch
                {
                    order = null;
                }
            }else{
                order = null;
            }


            return order;
        }

        /// <summary>
        /// Direct Pay
        /// </summary>
        /// <param name="dto">Direct Pay</param>
        [HttpGet]
        public Order CheckOut(string totalPrice)
        {
            var totalPriceTwoDec = float.Parse(totalPrice, System.Globalization.CultureInfo.InvariantCulture).ToString("0.00");

            int UserId = this.membershipService.GetCurrentUserId();
            Order order = new Order();

            //Create Order
            if (UserId > 0)
            {

                User user = this.membershipService.GetUserById(this.membershipService.GetCurrentUserId());
                List<Cart> UserCart = this.service.GetAllCartItemsByUserId(UserId).ToList();
                try
                {
                    order.RefCode = Guid.NewGuid().ToString();
                    order.ClientId = this.membershipService.GetCurrentUserId();
                    order.Email = user.Name;
                    order.Total = float.Parse(totalPriceTwoDec); //float.Parse(totalPriceTwoDec, System.Globalization.CultureInfo.InvariantCulture);
                    order.Qty = 1;// UserCart.Count;
                    order.DirectPay = false;
                    order.Status = "Submitted";
                    //order.DirectPayItemId = dto.Id;
                    //order.Products = ProductList;

                    //Generate Order
                    this.service.CreateNewOrder(order);


                    //Add Cart Items
                    foreach (Cart Item in UserCart)
                    {
                        this.service.AddUserOrderProduct(Item.ProductId, order.RefCode);
                    }
                }
                catch
                {
                    order = null;
                }
            }
            else
            {
                order = null;
            }


            return order;
        }

        /// <summary>
        /// Save Product
        /// </summary>
        /// <param name="dto">Product dto</param>
        [HttpPost]
        public void SaveProduct(ProductDataDTO dto)
        {
            BBWT.Data.Demo.Product product = new BBWT.Data.Demo.Product();
            if (dto.Type == "Projects")
            {
                product = BuildProduct(dto, true);
            }
            else if (dto.Type == "Games")
            {
                product = BuildProduct(dto, true);
            }
            else
            {
                product = BuildProduct(dto, false);
                //this.service.CreateProduct(product);
            }
        }
        private BBWT.Data.Demo.Product BuildProduct(ProductDataDTO dto, bool extra)
        {
            BBWT.Data.Demo.Product product = new BBWT.Data.Demo.Product();
            product.Category = dto.Category;
            product.File = dto.File;
            product.Price = dto.Price;
            product.Type = dto.Type;
            product.Title = dto.Title;
            product.Downloads = 0;
            //product.FakeDownloads = new Random().Next(7, 17);
            product.Purchased = 0;
            product.UploadedDate = DateTime.Now;
            product.Description = dto.Description;
            product.VideoCode = dto.VideoCode;
            product.URLDownload = dto.URLDownload;
            product.HasDemo = dto.HasDemo;
            product.IsGame = dto.IsGame;
            //Availabiliy
            product.Youtube = dto.Youtube;
            product.Unity = dto.Unity;
            product.Unreal = dto.Unreal;
            product.dsMax = dto.dsMax;
            product.Fbx = dto.Fbx;
            product.PC = dto.PC;
            product.Mac = dto.Mac;
            product.Linux = dto.Linux;
            product.Android = dto.Android;
            product.iOS = dto.iOS;
            product.PS3 = dto.PS3;
            product.PS4 = dto.PS4;
            product.XBOX = dto.XBOX;
            product.Complete = dto.Complete;
            this.service.CreateProduct(product);
            if (extra)
            {
                BBWT.Data.Demo.Product extraproduct = new BBWT.Data.Demo.Product();
                extraproduct = product;
                if (product.Type == "Projects" && product.Complete && product.IsGame)
                {
                    extraproduct.Type = "Games";
                    Category Pcategory = this.service.GetCategories(product.Type).FirstOrDefault(p => p.Name == product.Category);

                    if (Pcategory == null)
                    {
                        NewTypeCategoryDTO cat = new NewTypeCategoryDTO();
                        cat.Category = product.Category;
                        cat.Type = product.Type;
                        this.service.CreateNewCategory(cat);
                    }
                    this.service.CreateProduct(extraproduct);
                }
                else if (product.Type == "Games")
                {
                    extraproduct.Type = "Projects";
                    extraproduct.Complete = true;

                    Category Pcategory = this.service.GetCategories(product.Type).FirstOrDefault(p => p.Name == product.Category);
                    if (Pcategory == null)
                    {
                        NewTypeCategoryDTO cat = new NewTypeCategoryDTO();
                        cat.Category = product.Category;
                        cat.Type = product.Type;
                        this.service.CreateNewCategory(cat);
                    }
                    this.service.CreateProduct(extraproduct);
                }


                
            }

            return product;
        }

        [HttpPost]
        public bool SendForm(FormDTO formdto)
        {
            bool status = false;
            try
            {
                this.service.SubmitForm(formdto);
                status = true;
            }
            catch (Exception e)
            {
                status = false;
            }
            return status;
        }

        /// <summary>
        /// Save Product
        /// </summary>
        /// <param name="dto">Product dto</param>
        [HttpGet]
        public void DeleteProduct(int Id)
        {
            this.service.DeleteProduct(Id);

        }

        /// <summary>
        /// New Type
        /// </summary>
        /// <param name="dto">Product dto</param>
        [HttpPost]
        public void NewType(NewTypeCategoryDTO dto)
        {
            this.service.CreateNewType(dto.Type);

        }

        /// <summary>
        /// New Category
        /// </summary>
        /// <param name="dto">Product dto</param>
        [HttpPost]
        public void NewCat(NewTypeCategoryDTO dto)
        {
            this.service.CreateNewCategory(dto);

        }

        /// <summary>
        /// Get order details by ID
        /// </summary>
        /// <param name="id">Order ID</param>
        /// <returns>Order header</returns>
        //public OrderDTO GetOrderHeader(int id)
        //{
        //    return this.mapper.Map<OrderDTO>(this.service.GetOrderById(id));
        //}

        /// <summary>
        /// Get order details by ID
        /// </summary>
        /// <param name="id">Order ID</param>
        /// <returns>List of order items</returns>
        //public IQueryable<OrderDetailDTO> GetOrderItems(int id)
        //{
        //    return this.service.GetOrderById(id).OrderDetails.AsQueryable().Project().To<OrderDetailDTO>();
        //}

        /// <summary>
        /// Get territories
        /// </summary>
        /// <returns>Territories list</returns>
        public IQueryable<TerritoryDTO> GetAllTerritories()
        {
            return this.service.GetAllTerritories().Project().To<TerritoryDTO>();
        }

        /// <summary>Create territories</summary>
        /// <param name="models">List of territories to create</param>
        /// <returns>List of territories created</returns>
        public IList<TerritoryDTO> CreateTerritories(IList<TerritoryDTO> models)
        {
            foreach (var item in models)
            {
                var territory = this.mapper.Map<Territory>(item);
                this.service.CreateTerritory(territory);
                item.Id = territory.Id;
            }
            
            return models;
        }

        /// <summary>Update territories</summary>
        /// <param name="models">Territories</param>
        /// <returns>TRUE if territory is successfully updated</returns>
        public bool UpdateTerritories(IList<TerritoryDTO> models)
        {
            foreach (var item in models)
            {
                this.service.UpdateTerritory(
                    item.Id,
                    (Territory db) =>
                    {
                        db.Title = item.Title;
                        db.Region = item.Region;
                    });
            }

            return true;
        }

        /// <summary>Delete territory</summary>
        /// <param name="models">Territories list</param>
        /// <returns>TRUE if territory is successfully deleted</returns>
        public bool RemoveTerritory(IList<TerritoryDTO> models)
        {
            foreach (var item in models)
            {
                this.service.DeleteTerritory(item.Id);
            }

            return true;
        }
    }
}