namespace BBWT.Data.Membership
{
    /// <summary>
    /// User settings
    /// </summary>
    public class UserSettings : Entity
    {
        /// <summary>
        /// Language ID
        /// </summary>
        public int LanguageId { get; set; }

        /// <summary>
        /// Language of the user interface
        /// </summary>
        public virtual Language Language { get; set; }

        /// <summary>
        /// User
        /// </summary>
        public virtual User User { get; set; }
    }
}