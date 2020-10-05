namespace BBWT.Web
{
    using System.Web.Mvc;
    using System.Web.Routing;

    /// <summary>
    /// Routes configuration
    /// </summary>
    public class RouteConfig
    {
        /// <summary>
        /// Routes registration
        /// </summary>
        /// <param name="routes">Routes collection to add routes to</param>
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default", 
                url: "{controller}/{action}/{id}", 
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional });
        }
    }
}