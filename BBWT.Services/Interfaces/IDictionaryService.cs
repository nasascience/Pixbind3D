namespace BBWT.Services.Interfaces
{
    using System.Linq;
    using BBWT.Data.Membership;

    /// <summary>
    /// Dictionary service
    /// </summary>
    public interface IDictionaryService
    {
        /// <summary>
        /// Get user languages
        /// </summary>
        /// <returns>User languages</returns>
        IQueryable<Language> GetLanguages();
    }
}
