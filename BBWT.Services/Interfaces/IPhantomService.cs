namespace BBWT.Services.Interfaces
{
    using System;

    /// <summary>
    /// The PhantomJS service interface
    /// </summary>
    public interface IPhantomService
    {
        /// <summary>
        /// The GetWebPage
        /// </summary>
        /// <param name="url">The string of Url</param>
        /// <param name="escapedFragment">The string of escaped fragment in Url</param>
        /// <param name="applicationPath">The string of physical application path</param>
        /// <returns>The string with html of requested page</returns>
        string GetWebPage(Uri url, string escapedFragment, string applicationPath);
    }
}
