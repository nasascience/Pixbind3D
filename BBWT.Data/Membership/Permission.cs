namespace BBWT.Data.Membership
{
    /// <summary>
    /// Permission class definition
    /// </summary>
    public class Permission : Entity
    {
        #region Constants
        public const int CanManagePermissions = 1;

        public const int CanManageRoles = 2;

        public const int CanManageGroups = 3;

        public const int CanManageUsers = 4;

        public const int CanManageMenu = 5;
        
        public const int CanManageCompanies = 6;

        public const int CanManageTemplates = 7;

        public const int CompanyAdmin = 10;

        #endregion

        /// <summary>
        /// Permission unique code to use on client-side
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Permission name
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Is permission parameterised
        /// </summary>
        public bool IsParameterised { get; set; }

        /// <summary>
        /// Name of parameter
        /// </summary>
        public string ParameterName { get; set; }

        /// <summary>
        /// SQL clause to validate parameterised permission
        /// </summary>
        public string SQL { get; set; }
    }
}
