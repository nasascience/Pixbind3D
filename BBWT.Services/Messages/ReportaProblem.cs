namespace BBWT.Services.Messages
{
    /// <summary>
    /// The reporta problem.
    /// </summary>
    public class ReportaProblem
    {
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Gets or sets the e mail.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the description.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets the error log.
        /// </summary>
        public string[] ErrorLog { get; set; }

        /// <summary>
        /// Gets or sets the previous page.
        /// </summary>
        public string PreviousPage { get; set; }

        /// <summary>
        /// Gets or sets the severity.
        /// </summary>
        public Severity Severity { get; set; }

        /// <summary>
        /// Gets or sets the subject.
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// Gets or sets the time.
        /// </summary>
        public string Time { get; set; }
    }
}
