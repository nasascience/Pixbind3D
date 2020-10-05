namespace BBWT.Services.Interfaces
{
    using System.Linq;

    /// <summary>
    /// Error Handling service interface
    /// </summary>
    interface IErrorHandlingService
    {
        /// <summary>
        /// Throw HTTP Error 500 Internal Server Error
        /// </summary>
        void InternalServerError();

        /// <summary>
        /// Throw HTTP Error 401 Not Authorized
        /// </summary>
        void NotAuthorizedError();
    }
}
