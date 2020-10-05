namespace BBWT.Data.Membership
{
    using System.Collections.Generic;

    /// <summary>
    /// User class definition
    /// </summary>
    public class User : Entity
    {
        /// <summary>
        /// User name. The email is saved here.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the first name of the user.
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Gets or sets the surname of the user.
        /// </summary>
        public string Surname { get; set; }

        /// <summary>
        /// TRUE if user is administrator
        /// </summary>
        public bool IsAdmin { get; set; }

        /// <summary>
        /// List of permissions directly assigned to user
        /// </summary>
        public virtual ICollection<AssignedPermission> Permissions { get; set; }

        /// <summary>
        /// List of roles
        /// </summary>
        public virtual ICollection<Role> Roles { get; set; }

        /// <summary>
        /// List of user groups
        /// </summary>
        public virtual ICollection<Group> Groups { get; set; }

        /// <summary>
        /// User settings
        /// </summary>
        public virtual UserSettings UserSettings { get; set; }
    }
}
