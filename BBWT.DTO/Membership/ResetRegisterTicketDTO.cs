namespace BBWT.DTO.Membership
{
    /// <summary>
    /// ResetTicket DTO class definition
    /// </summary>
    public class ResetRegisterTicketDTO
    {
        /// <summary>
        /// User
        /// </summary>
        public UserDTO User { get; set; }

        /// <summary>
        /// Ticket
        /// </summary>
        public string Ticket { get; set; }
    }
}