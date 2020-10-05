namespace BBWT.DTO.Membership
{
    using System.Collections.Generic;

    /// <summary>
    /// Role DTO
    /// </summary>
    public class RoleDTO
    {
        /// <summary>
        /// Role ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Role name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Role permissions list
        /// </summary>
        public IList<CheckBoxItemDTO> Permissions { get; set; }

        /// <summary>
        /// List of users selection
        /// </summary>
        public IList<SelectedUserDTO> Users { get; set; }
    }
}