namespace BBWT.Web
{
    using System.Web.Optimization;

    /// <summary>
    /// Configuration of bundles
    /// </summary>
    public class BundleConfig
    {
        /// <summary>
        /// Register bundles
        /// </summary>
        /// <param name="bundles">Bundles collection</param>
        /// <remarks>
        /// For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        /// </remarks>
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css")
                .Include("~/Content/bootstrap/bootstrap.css", new CssRewriteUrlTransform())
                .Include("~/Content/bootstrap/bootstrap-theme.css", new CssRewriteUrlTransform())
                .Include("~/Content/kendo/kendo.common-bootstrap.min.css", new CssRewriteUrlTransform())
                .Include("~/Content/kendo/kendo.bootstrap.min.css", new CssRewriteUrlTransform())
                .Include("~/Content/jquery.simplePassMeter-0.6/simplePassMeter.css", new CssRewriteUrlTransform())
                .Include("~/Content/blueberry/Site.css", new CssRewriteUrlTransform())
                .Include("~/Content/blueberry/extend/fonts.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/color-picker.min.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/et_google_fonts.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/et_frontend_customizer.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/woocommerce-layout.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/woocommerce-smallscreen.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/woocommerce.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/pagenavi-css.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/style.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/style(1).css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/style(2).css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/shortcodes.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/shortcodes_responsive.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/jquery.fancybox-1.3.4.css", new CssRewriteUrlTransform())
                .Include("~/Content/Foxy_Theme/page_templates.css", new CssRewriteUrlTransform())
                .Include("~/Content/Site.css", new CssRewriteUrlTransform()));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/jquery")
                .Include(
                    "~/Scripts/jquery/jquery-{version}.js",
                    "~/Scripts/jquery/jquery.form.js",
                    "~/Scripts/underscore/underscore.js",
                    "~/Scripts/jquery/jquery.touchSwipe.js",
                    "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/passmeter")
                .Include("~/Scripts/jquery.simplePassMeter-0.6/jquery.simplePassMeter.js"));

            bundles.Add(
                new ScriptBundle("~/bundles/angular").Include(
                    "~/Scripts/angular/angular.js",
                    "~/Scripts/angular/i18n/angular-locale_en-us.js",
                    "~/Scripts/angular/angular-animate.min.js",
                    "~/Scripts/angular/angular-route.js",
                    "~/Scripts/angular/angular-sanitize.js"));

            bundles.Add(new ScriptBundle("~/bundles/kendo")
                .Include(
                "~/Scripts/kendo/kendo.web.min.js",
                "~/Scripts/kendo/kendo.notification.min.js",
                "~/Scripts/kendo/kendo.culture.en-us.min.js",
                "~/Scripts/kendo/kendo.popup.min.js",
                "~/Scripts/angular/angular-kendo.js",
                "~/Scripts/kendo/kendo.all.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/application")
                .Include("~/Scripts/angular-fix.js")
                .IncludeDirectory("~/app/libraries", "*.js")
                .IncludeDirectory("~/app/services", "*.js")
                .IncludeDirectory("~/app/controllers", "*.js")
                .IncludeDirectory("~/app/controllers/admin", "*.js")
                .IncludeDirectory("~/app/controllers/membership", "*.js")
                .IncludeDirectory("~/app/controllers/reports", "*.js")
                .IncludeDirectory("~/app/controllers/demo", "*.js")
                .IncludeDirectory("~/app/controllers/AnimMax", "*.js")
                .IncludeDirectory("~/app/directives", "*.js")
                .Include("~/app/app.js")
                .Include("~/Content/3DTemplate/js/script.js"));


            // BundleTable.EnableOptimizations = true;
        }
    }
}