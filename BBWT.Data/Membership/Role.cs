namespace BBWT.Data.Membership
{
    using System.Collections.Generic;

    /// <summary>
    /// Role class definition
    /// </summary>
    public class Role : Entity
    {
        /// <summary>
        /// Role name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// List of permissions assigned to role
        /// </summary>
        public virtual ICollection<AssignedPermission> Permissions { get; set; }
    }
}
