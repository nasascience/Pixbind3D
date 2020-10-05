namespace BBWT.Services.Classes
{
    using BBWT.Domain;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Helper service implementation
    /// </summary>
    public class HelperService : IHelperService
    {
        private readonly IDataContext context;

        /// <summary>
        /// Constructs new instance of <see cref="HelperService"/>
        /// </summary>
        /// <param name="ctx">Data context</param>
        public HelperService(IDataContext ctx)
        {
            this.context = ctx;
        }

        /// <summary>
        /// Initialize service
        /// </summary>
        public void Initialize()
        {
            this.context.Commit();
        }
    }
}
