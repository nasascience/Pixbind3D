namespace BBWT.Web.OData
{
    using System.Linq;
    using System.Web.Http.OData;

    using AutoMapper.QueryableExtensions;

    using BBWT.DTO.Demo;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Roles OData controller
    /// </summary>
    public class OrdersODataController : ODataController
    {
        private IDemoService service;

        /// <summary>
        /// Constructs new instance of <see cref="RolesODataController"/>
        /// </summary>
        /// <param name="service">Demo service instance</param>
        public OrdersODataController(IDemoService service)
        {
            this.service = service;
        }

        /// <summary>
        /// Get list of orders
        /// </summary>
        /// <returns>List of roles</returns>
        //public IQueryable<OrderDTO> Get()
        //{
        //    return this.service.GetAllOrders().Project().To<OrderDTO>();
        //}
        //// Since we need IE7 to support this approach doesn't work - need separate URL for every 
        ////            kind of request. I doubt it though. If we could determine the kind of operation here,
        ////than why not?
        //// // POST /odata/Products 
        ////public HttpResponseMessage Post(OrderDTO orderDto){
        ////    //var orderDtoToPatch = Mapper.Map<Order, OrderDTO>(this.service.GetOrderById(key));
        ////    //patch.Patch(orderDtoToPatch);
        ////    var order = Mapper.Map<OrderDTO, Order>(orderDto);
        ////    this.service.UpdateOrder(order.Id, order);
        ////    return new HttpResponseMessage(System.Net.HttpStatusCode.OK);
        ////}
    }
}