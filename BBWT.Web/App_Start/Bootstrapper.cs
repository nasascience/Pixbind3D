namespace BBWT.Web
{
    using System.Security.Principal;
    using System.Web;
    using System.Web.Http;
    using System.Web.Mvc;

    using AutoMapper;

    using Microsoft.Practices.Unity;
    using Microsoft.Practices.Unity.Configuration;

    using Unity.Mvc4;

    /// <summary>
    /// Unity IoC configuration class
    /// </summary>
    public static class Bootstrapper
    {
        /// <summary>
        /// Initialize unity
        /// </summary>
        /// <remarks>Most configuration settings are defined in web.config</remarks>
        /// <returns>Configured container</returns>
        public static IUnityContainer Initialise()
        {
            var container = new UnityContainer();
            container.RegisterType<IPrincipal>(new InjectionFactory(c => HttpContext.Current.User));
            container.RegisterInstance(Mapper.Engine);

            container.LoadConfiguration();

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);

            return container;
        }
    }
}