namespace BBWT.DTO.Membership
{
    using System.Collections.Generic;

    /// <summary>
    /// Role permissions DTO
    /// </summary>
    public class RolePermissionsDTO
    {
        /// <summary>
        /// Role name
        /// </summary>
        public string Role { get; set; }

        /// <summary>
        /// List of permissions
        /// </summary>
        public IList<string> Permissions { get; set; }
    }
}
