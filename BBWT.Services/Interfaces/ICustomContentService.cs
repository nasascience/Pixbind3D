namespace BBWT.Services.Interfaces
{
    using System;
    using System.Linq;

    using BBWT.Data.Content;

    /// <summary>
    /// Custom content service interface
    /// </summary>
    public interface ICustomContentService
    {
        /// <summary>
        /// Get all content items
        /// </summary>
        /// <returns>List of content items</returns>
        IQueryable<CustomContent> GetAllContents();

        /// <summary>
        /// The Save template
        /// </summary>
        /// <param name="content">Custom content to create</param>
        void CreateContent(CustomContent content);

        /// <summary>Update Content</summary>
        /// <param name="id">Content id</param>
        /// <param name="action">action which updates db object</param>
        void UpdateContent(int id, Action<CustomContent> action);

        /// <summary>
        /// Delete email template
        /// </summary>
        /// <param name="id">Content ID to delete</param>
        void Delete(int id);

        /// <summary>Get custom content item by id</summary>
        /// <param name="id">Item ID</param>
        /// <returns>Custom content item</returns>
        CustomContent GetContentById(int id);
    }
}
