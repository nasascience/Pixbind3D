namespace BBWT.Web.WebAPI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using BBWT.Services.Classes;

    public class ErrorHandlingController : ApiController
    {
        private readonly ErrorHandlingService errorHandlingService;

        public ErrorHandlingController(ErrorHandlingService ehs) 
        {
            this.errorHandlingService = ehs;
        }
                
        /// <summary>
        /// Throw Exception
        /// </summary>
        /// <param name="exceptionThrown">Exception Thrown</param>
        [HttpPost]
        public void ThrowException([FromBody]int exceptionThrown)
        {
            switch (exceptionThrown)
            {
                case 1: // Timeout exception
                    throw new HttpResponseException(HttpStatusCode.RequestTimeout);
                case 2: // Internal Server Error
                    errorHandlingService.InternalServerError();
                    break;
                case 3: // Unauthorized
                    throw new HttpResponseException(HttpStatusCode.Unauthorized);
                case 5: // Forbidden
                    throw new HttpResponseException(HttpStatusCode.Forbidden);
                default:
                    throw new Exception();
            }
        }
    }
}