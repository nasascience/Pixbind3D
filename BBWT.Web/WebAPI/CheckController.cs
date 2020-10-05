namespace BBWT.Web.WebAPI
{
    using System.Web.Http;

    /// <summary>
    /// Simplt controller to check if value is unique
    /// </summary>
    public class CheckController : ApiController
    {
        /// <summary>
        /// Check if value is unique
        /// </summary>
        /// <param name="field">field to check</param>
        /// <param name="value">value to check</param>
        /// <returns>Unique status of field value</returns>
        [HttpPost]
        public bool IsUnique(string field, string value)
        {
            return true;
        }
    }
}