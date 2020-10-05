namespace BBWT.Web.WebAPI
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Http;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using BBWT.Data.Menu;
    using BBWT.DTO;
    using BBWT.Services.Classes;

    /// <summary>
    /// Web API Menu Controller
    /// </summary>
    public class MenuController : ApiController
    {
        private readonly MenuService menuService;

        private readonly IMappingEngine mapper;

        /// <summary>Constructs MenuController class</summary>
        /// <param name="ms">Menu Service instance</param>
        /// <param name="mapper">Mapper instance</param>
        public MenuController(MenuService ms, IMappingEngine mapper)
        {
            this.menuService = ms;
            this.mapper = mapper;
        }

        /// <summary>
        /// Get effective menu elements
        /// </summary>
        /// <returns>List of menu elements</returns>
        public IQueryable<MenuItemDTO> GetMenu()
        {
            return this.menuService.GetAllMenuItems().Project().To<MenuItemDTO>();
        }

        /// <summary>        
        /// Save menu        
        /// </summary>
        /// <param name="models">Menu items</param>
        /// <returns>result</returns>
        [HttpPost]
        public bool SaveMenu(IList<MenuItemDTO> models)
        {                        
            var items = models.Select(s => new MenuItem
            {
                Id = s.Id,
                Name = s.Name,
                Url = s.Url,
                ParentId = s.ParentId,
                Order = s.Order
            }).ToList();

            return this.menuService.SaveMenu(items);         
        }

        /// <summary>
        /// The reset menu.
        /// </summary>
        /// <returns>
        /// The <see cref="bool"/>.
        /// </returns>
        [HttpPost]
        public bool ResetMenu()
        {
            return this.menuService.ResetMenu();
        }
    }
}