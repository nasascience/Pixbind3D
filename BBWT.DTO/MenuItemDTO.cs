namespace BBWT.DTO
{
    using System.Collections.Generic;

    /// <summary>
    /// Data transfer object for menu item
    /// </summary>
    public class MenuItemDTO
    {
        /// <summary>
        /// Menu item ID
        /// </summary>        
        public int Id { get; set; }

        /// <summary>
        /// Menu item name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// URL to go to
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Menu item parent ID
        /// </summary>        
        public int ParentId { get; set; }

        /// <summary>
        /// Sort order
        /// </summary>        
        public int Order { get; set; }
    }
}