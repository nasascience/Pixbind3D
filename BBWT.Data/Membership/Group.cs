namespace BBWT.Data.Membership
{
    using System.Collections.Generic;

    /// <summary>
    /// Group entity
    /// </summary>
    public class Group : Entity
    {
        /// <summary>
        /// Group name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// List of group users
        /// </summary>
        public virtual ICollection<User> Users { get; set; }

        /// <summary>
        /// List of permissions assigned to Group
        /// </summary>
        public virtual ICollection<AssignedPermission> Permissions { get; set; }

        /// <summary>
        /// List of roles assigned to Group
        /// </summary>
        public virtual ICollection<Role> Roles { get; set; }
    }
}