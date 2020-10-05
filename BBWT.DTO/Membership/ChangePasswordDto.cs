namespace BBWT.DTO.Membership
{
    /// <summary>
    /// Password update DTO
    /// </summary>
    public class ChangePasswordDto
    {
        /// <summary>
        /// User name. Email is stored here.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        public string CurrentPassword { get; set; }

        /// <summary>
        /// New password
        /// </summary>
        public string NewPassword { get; set; } 
    }
}