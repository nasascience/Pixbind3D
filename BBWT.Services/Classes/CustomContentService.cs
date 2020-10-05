namespace BBWT.Services.Classes
{
    using System;
    using System.Linq;

    using BBWT.Data.Content;
    using BBWT.Domain;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Custom content service implementation
    /// </summary>
    public class CustomContentService : ICustomContentService
    {
        private readonly IDataContext context;

        /// <summary>
        /// Constructs custom content service instance
        /// </summary>
        /// <param name="ctx">Data context</param>
        public CustomContentService(IDataContext ctx)
        {
            this.context = ctx;
        }

        /// <summary>
        /// Get all content items
        /// </summary>
        /// <returns>list of custom content items</returns>
        public IQueryable<CustomContent> GetAllContents()
        {
            return this.context.CustomContents;
        }

        /// <summary>
        /// Save content item
        /// </summary>
        /// <param name="content">Item to save</param>
        public void CreateContent(CustomContent content)
        {
            this.context.CustomContents.Add(content);
            this.context.Commit();
        }

        /// <summary>
        /// Update custom content item
        /// </summary>
        /// <param name="id">Item id</param>
        /// <param name="action">data update action</param>
        public void UpdateContent(int id, Action<CustomContent> action)
        {
            var item = this.context.CustomContents.Find(id);
            if (item == null || action == null)
            {
                return;
            }

            action(item);
            this.context.Commit();
        }

        /// <summary>
        /// Delete custom content item
        /// </summary>
        /// <param name="id">Custom content item ID</param>
        public void Delete(int id)
        {
            var item = this.context.CustomContents.Find(id);
            if (item == null)
            {
                return;
            }

            this.context.CustomContents.Remove(item);
            this.context.Commit();
        }

        /// <summary>Get custom content item by id</summary>
        /// <param name="id">Item id</param>
        /// <returns>Custom content item</returns>
        public CustomContent GetContentById(int id)
        {
            return this.context.CustomContents.Find(id);
        }
    }
}
