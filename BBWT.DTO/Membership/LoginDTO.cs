namespace BBWT.DTO.Membership
{
    /// <summary>
    /// Login data transfer object
    /// </summary>
    public class LoginDTO
    {
        /// <summary>
        /// password
        /// </summary>
        public string Pass { get; set; }

        /// <summary>
        /// save
        /// </summary>
        public bool Save { get; set; }

        /// <summary>
        /// user name
        /// </summary>
        public string User { get; set; }
    }
}