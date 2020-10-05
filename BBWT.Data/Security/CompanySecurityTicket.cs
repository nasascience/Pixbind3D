namespace BBWT.Data.Security
{
    using BBWT.Data.Membership;

    /// <summary>
    /// Company security ticket definition
    /// </summary>
    public class CompanySecurityTicket : SecurityTicket
    {
        /// <summary>
        /// Ticket Company
        /// </summary>
        public Company Company { get; set; }

        /// <summary>
        /// Ticket Group
        /// </summary>
        public Group Group { get; set; }

        /// <summary>
        /// Ticket Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// First name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Second name
        /// </summary>
        public string SecondName { get; set; }
    }
}
