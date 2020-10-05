namespace BBWT.Data.Content
{
    /// <summary>
    /// Custom content
    /// </summary>
    public class CustomContent : Entity
    {
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
