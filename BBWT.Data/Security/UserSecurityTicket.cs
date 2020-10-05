namespace BBWT.Data.Security
{
    using BBWT.Data.Membership;

    /// <summary>
    /// User security ticket
    /// </summary>
    public class UserSecurityTicket : SecurityTicket
    {
        /// <summary>
        /// User ID
        /// </summary>        
        public virtual User User { get; set; }
    }
}
