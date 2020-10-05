namespace BBWT.DTO.Membership
{
    /// <summary>
    /// Permission detail information DTO
    /// </summary>
    public class PermissionDetailsDTO : PermissionDTO
    {
        /// <summary>
        /// Is permission parametrised?
        /// </summary>
        public bool IsParameterised { get; set; }

        /// <summary>
        /// Parameter name
        /// </summary>
        public string ParameterName { get; set; }

        /// <summary>
        /// SQL to check if user has the permission
        /// </summary>
        public string SQL { get; set; }
    }
}