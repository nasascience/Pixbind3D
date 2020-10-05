namespace BBWT.DTO.Membership
{
    /// <summary>
    /// User DTO class definition
    /// </summary>
    public class AccountDTO
    {
        /// <summary>
        /// User full nmae
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Key field
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// User name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// IsAdmin
        /// </summary>
        public bool IsAdmin { get; set; }
    }
}