namespace BBWT.Web.WebAPI
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using BBWT.Data.Demo;
    using BBWT.DTO.Demo;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Demo Controller
    /// </summary>
    public class DemoController : ApiController
    {
        private readonly IDemoService service;

        private readonly IMappingEngine mapper;

        /// <summary>
        /// Constructs demo controller object
        /// </summary>
        /// <param name="svc">Service</param>
        /// <param name="map">Mapper</param>
        public DemoController(IDemoService svc, IMappingEngine map)
        {
            this.service = svc;
            this.mapper = map;
        }

        /// <summary>
        /// Get all customers from repository
        /// </summary>
        /// <returns>Customers list</returns>
        public IQueryable<Customer> GetAllCustomers()
        {
            return this.service.GetAllCustomers();
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
                this.service.UpdateTerritory( item.Id, (Territory db) => {
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