namespace BBWT.Data.Membership
{
    /// <summary>
    /// Assigned permission with parameter value
    /// </summary>
    public class AssignedPermission : Entity
    {
        /// <summary>
        /// Link on assigned permission
        /// </summary>
        public virtual Permission LinkedPermission { get; set; }

        /// <summary>
        /// Parameter value if permission is parameterized
        /// </summary>
        public string ParameterValue { get; set; }
    }
}
