namespace BBWT.DTO.Membership
{
    /// <summary>
    /// Permission DTO
    /// </summary>
    public class PermissionDTO
    {
        /// <summary>
        /// Permission unique code
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Key field
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// TRUE if permission is "system"
        /// </summary>
        public bool IsSystem { get; set; }

        /// <summary>
        /// Name of permission
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// TRUE if the permission is parametrised
        /// </summary>
        public bool HasParameter { get; set; }
    }
}