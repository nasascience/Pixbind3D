namespace BBWT.DTO.Content
{
    /// <summary>
    /// Custom content item DTO
    /// </summary>
    public class CustomContentItemDTO
    {
        /// <summary>
        /// Content ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Content title
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Notes and comments
        /// </summary>
        public string Notes { get; set; }

        /// <summary>
        /// Content text (html)
        /// </summary>
        public string Content { get; set; }
    }
}
