namespace BBWT.DTO.Membership
{
    /// <summary>
    /// Company registration DTO
    /// </summary>
    public class RegisterCompanyDTO
    {
        #region Step 1

        /// <summary>
        /// Company name
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Gets or sets the company first name.
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Gets or sets the company surname.
        /// </summary>
        public string Surname { get; set; }

        /// <summary>
        /// Gets or sets the company email.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the company password.
        /// </summary>
        public string Password { get; set; }

        #endregion

        #region Step 2

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

        #endregion

        #region Step 3

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

        #endregion
    }
}