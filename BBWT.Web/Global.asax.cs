namespace BBWT.Web
{
    using System;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    using BBWT.Services.Classes;
    using BBWT.Services.Interfaces;
    using BBWT.Web.App_Start;

    using Common.Logging;

    using NLog;

    using LogManager = Common.Logging.LogManager;

    /// <summary>
    /// Application main class
    /// </summary>
    /// <remarks>
    /// Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    /// visit http://go.microsoft.com/?LinkId=9394801
    /// </remarks>
    public class MvcApplication : System.Web.HttpApplication
    {
        private static ILog loggerInstance = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Set log file custom fields
        /// </summary>
        /// <param name="source">event source</param>
        /// <param name="e">event arguments</param>
        protected void Application_AcquireRequestState(object source, EventArgs e)
        {
            var app = (HttpApplication)source;
            var context = app.Context;

            var userName = context.User != null && context.User.Identity != null
                           && context.User.Identity.IsAuthenticated
                               ? context.User.Identity.Name
                               : "NULL";

            var ip = context.Request.UserHostAddress ?? "NULL";

            // var browserName = context.Request.Browser.Type;
            MappedDiagnosticsContext.Set("User", userName);
            MappedDiagnosticsContext.Set("IP", ip);

            // MappedDiagnosticsContext.Set("Browser", browserName);
            LogManager.GetCurrentClassLogger().Info(context.Request.Url.PathAndQuery);
        }

        /// <summary>
        /// Application error interceptor
        /// </summary>
        protected void Application_Error()
        {
            var error = this.Server.GetLastError();
            loggerInstance.Error(error);
        }

        /// <summary>
        /// Application start event processing
        /// </summary>
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            Bootstrapper.Initialise();

            DependencyResolver.Current.GetService<IHelperService>().Initialize();
            MapperConfig.Initialize();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            GlobalConfiguration.Configuration.EnsureInitialized(); 
        }
        
        /// <summary>
        /// Application stop event processing
        /// </summary>
        protected void Application_Stop()
        {
            if (KeepAlive.IsKeepingAlive)
            {
                KeepAlive.Stop();
            }
        }

        /// <summary>
        /// Begin request event processing
        /// </summary>
        /// <param name="source">event source</param>
        /// <param name="e">event parameter</param>
        //private const string ROOT_DOCUMENT = "Home/Index.cshtml";
        private void Application_BeginRequest(object source, EventArgs e)
        {
            var app = (HttpApplication)source;
            var context = app.Context;

            if (!KeepAlive.IsKeepingAlive)
            {
                KeepAlive.Start(context.Request.Url.ToString());
            }

           /* string url = Request.Url.LocalPath;
            if (!System.IO.File.Exists(Context.Server.MapPath(url)))
                Context.RewritePath(ROOT_DOCUMENT);*/
        }

       /* private const string ROOT_DOCUMENT = "/default.aspx";

        protected void Application_BeginRequest(Object sender, EventArgs e)
        {
            string url = Request.Url.LocalPath;
            if (!System.IO.File.Exists(Context.Server.MapPath(url)))
                Context.RewritePath(ROOT_DOCUMENT);
        }*/
    }
}