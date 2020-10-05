namespace BBWT.Services.Interfaces
{
    using System;
    using BBWT.Data.Membership;
    using BBWT.Data.Security;

    /// <summary>
    /// Security service interface
    /// </summary>
    public interface ISecurityService
    {
        /// <summary>
        /// Issues ticket for current datetime
        /// </summary>
        /// <returns>Ticket id</returns>
        string CreateTicket();

        /// <summary>Issues ticket for specified user and current datetime</summary>
        /// <param name="user">ticket user</param>
        /// <returns>Ticket id</returns>
        string CreateTicketForUser(User user);

        /// <summary>Issues ticket for specified company and current datetime</summary>
        /// <param name="company">ticket company</param>
        /// <param name="group">ticket group</param>
        /// <param name="email">email</param>
        /// <param name="firstName">first name</param>
        /// <param name="secondName">second name</param>
        /// <returns>Ticket id</returns>
        string CreateTicketForCompany(Company company, Group group, string email = null, string firstName = null, string secondName = null);

        /// <summary>Checks if there's a valid security ticket</summary>
        /// <param name="ticket">ticket</param>
        /// <returns>Ticket Entity</returns>
        SecurityTicket CheckTicket(string ticket);

        /// <summary>Checks if there's a valid security ticket for specified user</summary>
        /// <param name="ticket">ticket id</param>
        /// <param name="user">ticket user</param>
        /// <returns>Security Ticket</returns>
        UserSecurityTicket CheckTicketForUser(string ticket, User user);

        /// <summary>Checks if there's a valid security ticket for specified company</summary>
        /// <param name="ticket">ticket id</param>
        /// <param name="company">ticket company</param>
        /// <returns>Ticket Entity</returns>
        CompanySecurityTicket CheckTicketForCompany(string ticket, Company company);

        /// <summary>Checks if there's a valid security ticket for specified group</summary>
        /// <param name="ticket">security ticket id</param>
        /// <param name="group">group to register user</param>
        /// <returns>ticket entity</returns>
        CompanySecurityTicket CheckTicketForCompanyGroup(string ticket, Group group);

        /// <summary>Mark ticket if it is for one-use only</summary>
        /// <param name="ticket">ticket id</param>
        void MarkTicketAsUsed(string ticket);

        /// <summary>Mark ticket if it is for one-use only</summary>
        /// <param name="ticket">ticket id</param>
        void MarkUserTicketAsUsed(string ticket);

        /// <summary>Mark ticket if it is for one-use only</summary>
        /// <param name="ticket">ticket id</param>
        void MarkCompanyTicketAsUsed(string ticket);

        /// <summary>
        /// Deletes all expired and used tickets. Either call it on application shutdown or add sql server job
        /// to call stored procedure DeleteInvalidTickets weekly.
        /// </summary>
        void ClearAllInvalidTickets();

        /// <summary>Get encoded url for ticket</summary>
        /// <param name="url">url</param>
        /// <param name="ticket">ticket</param>
        /// <returns>encoded url</returns>
        string EncodeTicket(string url, Guid ticket);

        /// <summary>Decode ticket</summary>
        /// <param name="encodedTicket">encoded ticket</param>
        /// <returns>ticket</returns>
        string DecodeTicket(string encodedTicket);

        /// <summary>Get user information by ticket</summary>
        /// <param name="ticket">ticket</param>
        /// <returns>user</returns>
        User GetUserByTicket(string ticket);
    }
}