namespace BBWT.Web
{
    using System.Net.Http.Formatting;
    using System.Web.Http;
    using System.Web.Http.Filters;
    using System.Web.Http.OData.Builder;

    using BBWT.Data;
    using BBWT.DTO.Content;
    using BBWT.DTO.Demo;
    using BBWT.DTO.Membership;
    using BBWT.DTO.Reports;
    using BBWT.DTO.Template;

    using Common.Logging;

    /// <summary>
    /// Web api configuration
    /// </summary>
    public static class WebApiConfig
    {
        /// <summary>
        /// Register web api settings
        /// </summary>
        /// <param name="config">configuration to update</param>
        public static void Register(HttpConfiguration config)
        {
            GlobalConfiguration.Configuration.Filters.Add(new LogExceptionFilter());

            GlobalConfiguration.Configuration.Formatters.JsonFormatter.AddQueryStringMapping(
                "$format", "json", "application/json");
            GlobalConfiguration.Configuration.Formatters.XmlFormatter.AddQueryStringMapping(
                "$format", "xml", "application/xml");

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi", 
                routeTemplate: "api/{controller}/{action}/{id}", 
                //routeTemplate: "api/{controller}/{action}/{id}", 
                defaults: new { id = RouteParameter.Optional });

            var modelBuilder = new ODataConventionModelBuilder();
            modelBuilder.EntitySet<TestProduct>("TestProductsOData");
            modelBuilder.EntitySet<OrderDTO>("OrdersOData");
            modelBuilder.EntitySet<PermissionDTO>("PermissionsOData");
            modelBuilder.EntitySet<GroupsListItemDTO>("GroupsOData");
            modelBuilder.EntitySet<RolesListItemDTO>("RolesOData");
            modelBuilder.EntitySet<EmailTemplateDTO>("TemplatesOData");
            modelBuilder.EntitySet<AccountDTO>("UsersOData");
            modelBuilder.EntitySet<CompanyListItemDTO>("CompaniesOData");
            modelBuilder.EntitySet<CustomContentDTO>("CustomContentOData");
            modelBuilder.EntitySet<ReportDTO>("ReportsOData");
            modelBuilder.EntitySet<PublicacionDTO>("PublicacionOData");

            var model = modelBuilder.GetEdmModel();
            config.Routes.MapODataRoute(routeName: "OData", routePrefix: "odata", model: model);

            config.EnableQuerySupport();

            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
            config.Formatters.Remove(config.Formatters.XmlFormatter);


        }

    }

    /// <summary>
    /// Exceptions interceptor
    /// </summary>
    public class LogExceptionFilter : ExceptionFilterAttribute
    {
        private static readonly ILog Logger = LogManager.GetLogger(typeof(LogExceptionFilter));

        /// <summary>
        /// Log unhandled exceptions
        /// </summary>
        /// <param name="actionExecutedContext">context</param>
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            Logger.Error(actionExecutedContext.Exception);
            base.OnException(actionExecutedContext);
        }
    }
}