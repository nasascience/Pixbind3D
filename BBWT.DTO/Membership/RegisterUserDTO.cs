namespace BBWT.DTO.Membership
{
    /// <summary>
    /// User registration DTO
    /// </summary>
    public class RegisterUserDTO
    {
        /// <summary>
        /// User name. Email is stored here.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// User name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Surname
        /// </summary>
        public string Surname { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        public string Pass { get; set; }
    }
}