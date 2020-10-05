namespace BBWT.DTO.Membership
{
    using System.Collections.Generic;

    /// <summary>
    /// Company DTO
    /// </summary>
    public class CompanyDTO
    {
        /// <summary>
        /// Company ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Company name
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Main contact name
        /// </summary>
        public string MainContactName { get; set; }

        /// <summary>
        /// Main contact address line 1
        /// </summary>
        public string MainContactAddress1 { get; set; }

        /// <summary>
        /// Main contact address line 2
        /// </summary>
        public string MainContactAddress2 { get; set; }

        /// <summary>
        /// Main contact phone number
        /// </summary>
        public string MainContactPhoneNumber { get; set; }

        /// <summary>
        /// Main contact mobile number
        /// </summary>
        public string MainContactMobileNumber { get; set; }

        /// <summary>
        /// Main contact email
        /// </summary>
        public string MainContactEmail { get; set; }

        /// <summary>
        /// Main contact postcode
        /// </summary>
        public string MainContactPostcode { get; set; }

        /// <summary>
        /// Billing contact name
        /// </summary>
        public string BillingContactName { get; set; }

        /// <summary>
        /// Billing contact address line 1
        /// </summary>
        public string BillingContactAddress1 { get; set; }

        /// <summary>
        /// Billing contact address line 2
        /// </summary>
        public string BillingContactAddress2 { get; set; }

        /// <summary>
        /// Billing contact phone
        /// </summary>
        public string BillingContactPhoneNumber { get; set; }

        /// <summary>
        /// Billing contact mobile
        /// </summary>
        public string BillingContactMobileNumber { get; set; }

        /// <summary>
        /// Billing contact email
        /// </summary>
        public string BillingContactEmail { get; set; }

        /// <summary>
        /// Billing contact postcode
        /// </summary>
        public string BillingContactPostcode { get; set; }

        /// <summary>
        /// Comment
        /// </summary>
        public string Comment { get; set; }

        /// <summary>
        /// List of permissions
        /// </summary>
        public IList<CheckBoxItemDTO> Permissions { get; set; }

        /// <summary>
        /// List of groups
        /// </summary>
        public IList<CheckBoxItemDTO> Groups { get; set; }

        /////// <summary>
        /////// Company users
        /////// </summary>
        ////public virtual IList<User> Users { get; set; }
    }
}