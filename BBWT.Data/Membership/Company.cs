namespace BBWT.Data.Membership
{
    using System.Collections.Generic;

    /// <summary>
    /// Company definition
    /// </summary>
    public class Company : Entity
    {
        /// <summary>
        /// Company Name
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Contact name
        /// </summary>
        public string MainContactName { get; set; }

        /// <summary>
        /// Contact address
        /// </summary>
        public string MainContactAddress { get; set; }

        /// <summary>
        /// Phone number
        /// </summary>
        public string MainContactPhoneNumber { get; set; }

        /// <summary>
        /// Mobile phone number
        /// </summary>
        public string MainContactMobileNumber { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string MainContactEmail { get; set; }

        /// <summary>
        /// Main postcode
        /// </summary>
        public string MainContactPostcode { get; set; }

        /// <summary>
        /// Billing name
        /// </summary>
        public string BillingContactName { get; set; }

        /// <summary>
        /// Billing address
        /// </summary>
        public string BillingContactAddress { get; set; }

        /// <summary>
        /// Billing phone number
        /// </summary>
        public string BillingContactPhoneNumber { get; set; }

        /// <summary>
        /// Billing mobile number
        /// </summary>
        public string BillingContactMobileNumber { get; set; }

        /// <summary>
        /// Billing email
        /// </summary>
        public string BillingContactEmail { get; set; }

        /// <summary>
        /// Billing postcode
        /// </summary>
        public string BillingContactPostcode { get; set; }

        /// <summary>
        /// Comment
        /// </summary>
        public string Comment { get; set; }

        /// <summary>
        /// Company users
        /// </summary>
        public virtual ICollection<User> Users { get; set; }

        /// <summary>
        /// Company permissions
        /// </summary>
        public virtual ICollection<AssignedPermission> Permissions { get; set; }

        /// <summary>
        /// Company Groups
        /// </summary>
        public virtual ICollection<Group> Groups { get; set; }
    }
}
