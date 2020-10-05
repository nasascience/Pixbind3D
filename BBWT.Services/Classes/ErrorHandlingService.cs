using System;
namespace BBWT.Services.Classes
{
    using System.Linq;
    
    /// <summary>
    /// ErrorHandling Service
    /// </summary>
    public class ErrorHandlingService
    {
        /// <summary>
        /// Throw HTTP Error 500 Internal Server Error
        /// </summary>
        public void InternalServerError() {
            throw new Exception();
        }
    }
}
