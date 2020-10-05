namespace BBWT.Data.Security
{
    using System;

    /// <summary>
    /// Security Ticket definition
    /// </summary>
    public class SecurityTicket : Entity
    {
        /// <summary>
        /// Ticket value
        /// </summary>
        public string Ticket { get; set; }

        /// <summary>
        /// Expired date
        /// </summary>
        public DateTime ExpiredOn { get; set; }

        /// <summary>
        /// "Ticket is used" flag
        /// </summary>
        public bool IsUsed { get; set; }
    }
}
