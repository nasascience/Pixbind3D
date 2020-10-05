namespace BBWT.Services.Interfaces
{
    using System.Linq;

    using BBWT.Data.Menu;

    /// <summary>
    /// Menu Items management service
    /// </summary>
    public interface IMenuService
    {
        #region Public Methods and Operators

        /// <summary>
        /// All menu items
        /// </summary>
        /// <returns>List of menu items</returns>
        IQueryable<MenuItem> GetAllMenuItems();

        /// <summary>
        /// Effective menu items sorted by order
        /// </summary>
        /// <param name="id">Parent id of menu item</param>
        /// <returns>List of menu items</returns>
        IQueryable<MenuItem> GetMenuByParentId(int id);

        #endregion
    }
}
