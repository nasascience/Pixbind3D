namespace BBWT.DTO.Membership
{
    /// <summary>
    /// Company DTO
    /// </summary>
    public class CompanyListItemDTO
    {
        /// <summary>
        /// Company ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Company name
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Num of users
        /// </summary>
        public int UsersNum { get; set; }
    }
}