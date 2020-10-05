namespace BBWT.Web
{
    using System;
    using System.Web;

    using Microsoft.Practices.Unity;

    /// <summary>
    /// Http lifetime manager to use together with Unity DI container
    /// </summary>
    public class HttpRequestLifetimeManager : LifetimeManager
    {
        private readonly Guid key;

        /// <summary>
        /// Constructs new instance of <see cref="HttpRequestLifetimeManager"/>
        /// </summary>
        public HttpRequestLifetimeManager()
        {
            this.key = Guid.NewGuid();
        }

        /// <summary>
        /// Get current Lifetime Manager
        /// </summary>
        /// <returns>Lifetime Manager</returns>
        public override object GetValue()
        {
            return HttpContext.Current.Items[this.key];
        }

        /// <summary>
        /// Remove current lifetime manager from context
        /// </summary>
        public override void RemoveValue()
        {
            HttpContext.Current.Items.Remove(this.key);
        }

        /// <summary>
        /// Store lifetime manager to context
        /// </summary>
        /// <param name="newValue">value to store</param>
        public override void SetValue(object newValue)
        {
            HttpContext.Current.Items[this.key] = newValue;
        }
    }
}