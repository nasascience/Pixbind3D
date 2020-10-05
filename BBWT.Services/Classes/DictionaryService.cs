namespace BBWT.Services.Classes
{
    using System.Linq;
    using BBWT.Data.Membership;

    using Domain;
    using Interfaces;

    /// <summary>
    /// Dictionary Service implementation
    /// </summary>
    public class DictionaryService : IDictionaryService
    {
        private readonly IDataContext context;

        /// <summary>
        /// Constructs dictionary service
        /// </summary>
        /// <param name="ctx">data context</param>
        public DictionaryService(IDataContext ctx)
        {
            this.context = ctx;
        }

        /// <summary>
        /// Get languages
        /// </summary>
        /// <returns>languages</returns>
        public IQueryable<Language> GetLanguages()
        {
            return this.context.Languages;
        }
    }
}
