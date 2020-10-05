namespace BBWT.Web
{
    using System.Web.Mvc;

    /// <summary>
    /// Filter confuguration
    /// </summary>
    public class FilterConfig
    {
        /// <summary>
        /// Global filters registration
        /// </summary>
        /// <param name="filters">filters collection to add filter to</param>
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}