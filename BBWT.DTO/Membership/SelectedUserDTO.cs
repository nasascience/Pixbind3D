namespace BBWT.DTO.Membership
{
    /// <summary>
    /// Selected Users
    /// </summary>
    public class SelectedUserDTO
    {
        /// <summary>
        /// Is user checked
        /// </summary>
        public bool IsChecked { get; set; }

        /// <summary>
        /// User name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// User first name.
        /// </summary>
        public string FullName { get; set; }
    }
}
