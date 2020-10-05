namespace BBWT.DTO.Membership
{
    /// <summary>
    /// User update DTO
    /// </summary>
    public class UpdateUserDTO
    {
        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// User name. Email is stored here.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// User name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Surname
        /// </summary>
        public string Surname { get; set; }

        /// <summary>
        /// User settings language
        /// </summary>
        public int LanguageId { get; set; }
    }
}