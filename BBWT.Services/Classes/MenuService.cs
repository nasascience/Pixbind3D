namespace BBWT.Services.Classes
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Principal;

    using BBWT.Data.Menu;
    using BBWT.Domain;
    using BBWT.Services.Interfaces;            

    /// <summary>
    /// Service which helps to see and manage Menu Items
    /// </summary>
    public class MenuService : IMenuService
    {
        private readonly IDataContext context;

        private readonly IPrincipal user;

        /// <summary>Constructs Menu Service object</summary>
        /// <param name="ctx">Data Context</param>
        /// <param name="user">Current User</param>
        public MenuService(IDataContext ctx, IPrincipal user)
        {
            this.context = ctx;
            this.user = user;
        }

        /// <summary>
        /// All menu items
        /// </summary>
        /// <returns>List of menu items</returns>
        public IQueryable<MenuItem> GetAllMenuItems()
        {
            return this.context.MenuItems;
        }

        /// <summary>
        /// Effective menu items sorted by order
        /// </summary>
        /// <param name="id">Parent id of menu item</param>
        /// <returns>List of menu items</returns>
        public IQueryable<MenuItem> GetMenuByParentId(int id = 0)
        {
            return this.context.MenuItems.Where(m => m.ParentId == id).OrderBy(m => m.Order);
        }

        /// <summary>
        /// Save menu
        /// </summary>
        /// <param name="items">menu items</param>
        /// <returns>result</returns>
        public bool SaveMenu(IList<MenuItem> items)
        {
            foreach (var item in this.context.MenuItems)
            {
                this.context.MenuItems.Remove(item);
            }

            foreach (var item in items)
            {                
                this.context.MenuItems.Add((MenuItem)item);             
            }

            this.context.Commit();

            return true;
        }

        /// <summary>
        /// The reset menu.
        /// </summary>
        /// <returns>
        /// result
        /// </returns>
        public bool ResetMenu()
        {            
            foreach (var item in this.context.MenuItems)
            {
                this.context.MenuItems.Remove(item);
            }

            this.context.Commit();

            BBWT.Domain.Migrations.Configuration.SeedMenu(this.context);

            return true;
        }
    }
}