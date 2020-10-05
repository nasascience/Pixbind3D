namespace BBWT.Web.WebAPI
{
    using System.Collections.Generic;
    using System.Linq;
    using System;
    using System.Web.Http;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using BBWT.Data.Demo;
    using BBWT.DTO.Demo;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Demo Controller
    /// </summary>
    public class CartController : ApiController
    {
        private readonly IDemoService service;
        private readonly IMembershipService MemberShipService;

        private readonly IMappingEngine mapper;

        /// <summary>
        /// Constructs demo controller object
        /// </summary>
        /// <param name="svc">Service</param>
        /// <param name="map">Mapper</param>
        public CartController(IDemoService svc, IMappingEngine map, IMembershipService MSvc)
        {
            this.MemberShipService = MSvc;
            this.service = svc;
            this.mapper = map;
        }

        /// <summary>
        /// Get all customers from repository
        /// </summary>
        /// <returns>Customers list</returns>
        public IQueryable<Cart> GetAllCartItemsByUserId()
        {
            int UserId = this.MemberShipService.GetCurrentUserId();
            return this.service.GetAllCartItemsByUserId(UserId);
        }

        /// <summary>
        /// Get order details by ID
        /// </summary>
        /// <param name="id">Order ID</param>
        /// <returns>Order header</returns>
        //public CartDto GetCartItemById(int id)
        //{
        //    return this.mapper.Map<CartDto>(this.service.GetOrderById(id));
        //}



        /// <summary>Create territories</summary>
        /// <param name="models">List of territories to create</param>
        /// <returns>List of territories created</returns>
        public bool AddCartItem(ProductDTO Product)
        {
            Cart CartItem = new Cart();
            CartItem.ProductId = Product.Id;
            CartItem.ProductName = Product.Title;
            CartItem.File = Product.File;
            CartItem.ProductPrice = Product.Price;
            CartItem.AddedDate = DateTime.Now;
            CartItem.UserId = this.MemberShipService.GetCurrentUserId();
            CartItem.ProductCategory = Product.Category;


            //var cartitem = this.mapper.Map<Cart>(CartItem);
            this.service.AddCartItem(CartItem);
            return true;
        }


        /// <summary>Delete territory</summary>
        /// <param name="models">Territories list</param>
        /// <returns>TRUE if territory is successfully deleted</returns>
        [HttpGet]
        public bool RemoveCartItem(int Id)
        {
            this.service.DeleteCartItem(Id);
            return true;
        }
    }
}