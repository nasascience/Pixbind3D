namespace BBWT.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Web.Mvc;
    using BBWT.DTO.Demo;
    using BBWT.Data.Membership;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Home page controller
    /// </summary>
    public class HomeController : Controller
    {
        private readonly IMembershipService service;
        private readonly IPhantomService phantomService;
        private readonly IDemoService demoservice;

        private string output = string.Empty;

        /// <summary>
        /// Creates HomeController instance
        /// </summary>
        /// <param name="svc">Membership service instance</param>
        /// <param name="phantomService">The PhantomJS service instance</param>
        public HomeController(IMembershipService svc, IPhantomService phantomService, IDemoService demoservice)
        {
            this.service = svc;
            this.phantomService = phantomService;
            this.demoservice = demoservice;
        }

        /// <summary>
        /// Generates home page html
        /// </summary>
        /// <returns>Home page view</returns>
        //// [OutputCache(Location = System.Web.UI.OutputCacheLocation.Any, Duration = 300)]
        public ActionResult Index()
        {
            var browser = Request.Browser;
            if (browser.Browser == "IE" && browser.MajorVersion < 10)
            {
                return this.View("NotCompatible");
            }

            var user = this.service.GetCurrentUser();
            this.ViewBag.currentUser = 
                user == null ? 
                "null" : 
                string.Format("{{'Id':{0}, 'Name':'{1}', 'FullName':'{2}'}}", user.Id, user.Name, user.FirstName + " " + user.Surname);

            if (user != null)
            {
                this.ViewBag.currentPermissions = this.service.GetEffectivePermissions()
                          .Select(PermissionText)
                          .Union(new List<string> { "'authorized'" })
                          .Aggregate((a, b) => string.Format("{0},{1}", a, b));
            }
            else
            {
                this.ViewBag.currentPermissions = string.Empty;
            }

            string escapedFragment = this.Request.QueryString["_escaped_fragment_"];
            if (!string.IsNullOrEmpty(escapedFragment))
            {
                ContentResult result = new ContentResult();
                result.ContentType = "text/html";

                result.Content = (string)this.HttpContext.Cache.Get(this.Request.Url.OriginalString);
                if (string.IsNullOrEmpty(result.Content))
                {
                    result.Content = this.phantomService.GetWebPage(this.Request.Url, escapedFragment, this.Request.PhysicalApplicationPath);
                    this.HttpContext.Cache.Add(this.Request.Url.OriginalString, result.Content, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromDays(1), System.Web.Caching.CacheItemPriority.Low, null);
                }
                
                return result;
            }

            return this.View();
        }

        private static string PermissionText(AssignedPermission permission)
        {
            var text = permission.LinkedPermission.IsParameterised
                    ? string.Format("{0}({1})", permission.LinkedPermission.Code, permission.ParameterValue)
                    : permission.LinkedPermission.Code;

            return string.Format("'{0}'", text);
        }

    }
}