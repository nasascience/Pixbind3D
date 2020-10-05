[assembly: WebActivatorEx.PostApplicationStartMethod(typeof(BBWT.Web.App_Start.JSNLogConfig), "PostStart")]

namespace BBWT.Web.App_Start
{
    using System.Web.Routing;

    /// <summary>
    /// JSNLog configuration
    /// </summary>
    public static class JSNLogConfig
    {
        /// <summary>
        /// Set route for JSNLog
        /// </summary>
        public static void PostStart()
        {
            // Insert a route at the very start of the routing table (so it gets picked up before all other routes)
            // that ignores the jsnlog.logger route. That way, it will get through to the handler defined
            // in web.config.
            RouteTable.Routes.Insert(0, new Route("jsnlog.logger/{*pathInfo}", new StopRoutingHandler()));
        }
    }
}