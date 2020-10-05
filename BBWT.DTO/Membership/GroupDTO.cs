namespace BBWT.DTO.Membership
{
    using System.Collections.Generic;

    /// <summary>
    /// Data transfer object for group entity
    /// </summary>
    public class GroupDTO
    {
        /// <summary>
        /// Group ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Group name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Group permissions
        /// </summary>
        public IList<CheckBoxItemDTO> Permissions { get; set; }

        /// <summary>
        /// Group roles
        /// </summary>
        public IList<CheckBoxItemDTO> Roles { get; set; }
    }
}