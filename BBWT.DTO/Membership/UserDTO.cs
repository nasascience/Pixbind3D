namespace BBWT.DTO.Membership
{
    using System.Collections.Generic;

    /// <summary>
    /// User DTO class definition
    /// </summary>
    public class UserDTO
    {
        /// <summary>
        /// Key field
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// User name. Email is stored here.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// User first name.
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// User surname.
        /// </summary>
        public string Surname { get; set; }

        /// <summary>
        /// Gets or sets the password of the user.
        /// </summary>
        public string Password { get; set; }
        
        /// <summary>
        /// TRUE if user is email to register
        /// </summary>
        public bool IsEmailUserToRegister { get; set; }

        /// <summary>
        /// List of groups
        /// </summary>
        public IList<CheckBoxItemDTO> Groups { get; set; }

        /// <summary>
        /// List of permissions
        /// </summary>
        public IList<CheckBoxItemDTO> Permissions { get; set; }

        /// <summary>
        /// List of roles
        /// </summary>
        public IList<CheckBoxItemDTO> Roles { get; set; }
    }
}