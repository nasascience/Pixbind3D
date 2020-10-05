namespace BBWT.Web.WebAPI
{
    using System;
    using System.Collections.Specialized;
    using System.Net.Mail;
    using System.Web.Http;
    using BBWT.Services.Messages;

    /// <summary>
    /// Report a problem controller
    /// </summary>
    public class ReportaProblemController : ApiController
    {
        private readonly IEmailSender emailSender;

        /// <summary>
        /// Initializes report a problem controller.
        /// </summary>
        /// <param name="emailSender">The email Sender.</param>
        public ReportaProblemController(IEmailSender emailSender)
        {
            this.emailSender = emailSender;
        }

        /// <summary>
        /// Send report a problem
        /// </summary>
        /// <param name="report">The report.</param>
        public void Send(ReportaProblem report)
        {
            var tagValues = new NameValueCollection();
            tagValues.Add("$DateTime", DateTime.Now.ToString());
            tagValues.Add("$ProblemUserName", report.Name ?? string.Empty);

            ////MailAddress from = new MailAddress(report.Email, report.Name);
            ////tagValues.Add("$ProblemUserEmail", from.ToString());
            tagValues.Add("$ProblemUserEmail", report.Email);

            tagValues.Add("$ProblemDateTime", report.Time ?? string.Empty);
            tagValues.Add("$ProblemDescription", report.Description ?? string.Empty);
            tagValues.Add("$ProblemSeverity", report.Severity.ToString());
            tagValues.Add("$ProblemPreviousPage", report.PreviousPage ?? string.Empty);
            tagValues.Add("$ProblemErrorMessage", string.Join(",", report.ErrorLog));

            this.emailSender.SendEmail("ProblemNotification", tagValues, new MailAddressCollection { new MailAddress("bbwebtemplate-group@bbconsult.co.uk") }, null);
        }
    }
}
