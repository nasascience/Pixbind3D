namespace BBWT.Web.WebAPI
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Web.Http;
    using System.Web.Security;
    
    using AutoMapper;

    using BBWT.DTO.Membership;
    using BBWT.Services.Interfaces;

    using WebMatrix.WebData;

    /// <summary>
    /// Controller to support auth process
    /// </summary>
    public class AuthController : ApiController
    {
        private readonly IMembershipService membershipService;

        private readonly IMappingEngine mapper;

        /// <summary>Creates Auth controller</summary>
        /// <param name="membershipService">Membership Service injection</param>
        /// <param name="mapper">Mapper injection</param>
        public AuthController(IMembershipService membershipService, IMappingEngine mapper)
        {
            this.membershipService = membershipService;
            this.mapper = mapper;
        }

        /// <summary>
        /// Get current user if autentificated
        /// </summary>
        /// <returns>Current user if any</returns>
        public AccountDTO CurrentUser()
        {            
            if (WebSecurity.HasUserId)
            {
                return this.mapper.Map<AccountDTO>(this.membershipService.GetUserById(WebSecurity.CurrentUserId));                
            }

            return null;
        }

        /// <summary>
        /// Get current user if autentificated
        /// </summary>
        /// <returns>Current user if any</returns>
        [HttpGet]    
        public AccountDTO GetCurrentUser()
        {
            if (WebSecurity.HasUserId)
            {
                return this.mapper.Map<AccountDTO>(this.membershipService.GetUserById(WebSecurity.CurrentUserId));
            }

            return null;
        }

        /// <summary>Login user</summary>
        /// <param name="data">credentials</param>
        /// <returns>Found user</returns>
        [HttpPost]        
        public HttpResponseMessage Login([FromBody] LoginDTO data)
        {            
            //// login
            //// if (WebSecurity.Login(data.User, data.Pass, data.Save))
            try
            {
                if (Membership.ValidateUser(data.User, data.Pass))
                {
                    var ticket = new FormsAuthenticationTicket(
                        1, //// ticket version
                        data.User, //// authenticated username
                        DateTime.Now, //// issueDate
                        DateTime.Now.AddMinutes(30), //// expiryDate
                        true, //// true to persist across browser sessions
                        data.User, //// can be used to store additional user data
                        FormsAuthentication.FormsCookiePath); // the path for the cookie

                    //// Encrypt the ticket using the machine key
                    string encryptedTicket = FormsAuthentication.Encrypt(ticket);

                    //// Add the cookie to the request to save it                
                    var cookie = new CookieHeaderValue(FormsAuthentication.FormsCookieName, encryptedTicket)
                    {
                        Expires = DateTimeOffset.Now.AddMinutes(30),
                        ////Domain = Request.RequestUri.Host,
                        Path = "/",
                        HttpOnly = false
                    };

                    var response = Request.CreateResponse(HttpStatusCode.OK,
                        this.mapper.Map<AccountDTO>(this.membershipService.GetUserByName(data.User)));
                    response.Headers.AddCookies(new CookieHeaderValue[]
                    {
                        cookie
                    });
                    return response;

                    ////return this.mapper.Map<AccountDTO>(this.membershipService.GetUserByName(data.User));
                }

            }
            catch
            {

            }

            return new HttpResponseMessage(HttpStatusCode.NoContent);//.Forbidden);
        }

        /// <summary>
        /// Logout current user if logged in
        /// </summary>
        /// <returns>boolean result</returns>
        public bool Logout()
        {
            if (WebSecurity.HasUserId)
            {
                WebSecurity.Logout();
                return true;
            }
            
            return false;
        }        

        /// <summary>
        /// Get list of effective permissions for current user
        /// </summary>
        /// <returns>list of effective permissions</returns>
        public List<string> Permissions()
        {            
            ////if (WebSecurity.HasUserId)            
            ////{
            if (this.GetAuthenticationTicket() == null)
            {
                return new List<string>();
            }

            var res = this.membershipService.GetEffectivePermissions()
                .Select(
                    p =>
                        p.LinkedPermission.IsParameterised
                            ? string.Format("{0}({1})", p.LinkedPermission.Code, p.ParameterValue)
                            : p.LinkedPermission.Code)
                .ToList();

            res.Add("authorized");
            return res;

            ////}
            ////return new List<string>();
        }

        /// <summary>
        /// Get authentication ticket
        /// </summary>
        /// <returns>
        /// The FormsAuthenticationTicket
        /// </returns>
        private FormsAuthenticationTicket GetAuthenticationTicket()
        {
            var authCookies = this.Request.Headers.GetCookies(FormsAuthentication.FormsCookieName).LastOrDefault();
            if (authCookies == null)
            {
                return null;
            }

            var authCookie = authCookies.Cookies.FirstOrDefault(c => c.Name == FormsAuthentication.FormsCookieName);

            return authCookie == null ? null : FormsAuthentication.Decrypt(authCookie.Value);
        }

    }
}