namespace BBWT.Data.Menu
{
    using System.Collections.Generic;
    using System.ComponentModel;

    /// <summary>
    /// Menu item
    /// </summary>
    public class MenuItem : Entity
    {
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
        [DefaultValue(0)]
        public int ParentId { get; set; }

        /// <summary>
        /// Sort order
        /// </summary>
        [DefaultValue(0)]
        public int Order { get; set; }
    }
}
