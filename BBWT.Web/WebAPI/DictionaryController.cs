namespace BBWT.Web.WebAPI
{
    using System.Linq;
    using System.Web.Http;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using BBWT.DTO.Dictionary;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Dictionary controller
    /// </summary>
    public class DictionaryController : ApiController
    {
        private readonly IDictionaryService service;
        private readonly IMappingEngine mapper;

        /// <summary>
        /// Constructs dictionary controller object
        /// </summary>
        /// <param name="svc">Service</param>
        /// <param name="map">Mapper</param>
        public DictionaryController(IDictionaryService svc, IMappingEngine map)
        {
            this.service = svc;
            this.mapper = map;
        }

        /// <summary>
        /// Get Languages
        /// </summary>
        /// <returns>languages dictionary</returns>
        [HttpGet]
        public IQueryable<LanguageDTO> GetLanguages()
        {
            return this.service.GetLanguages().Project().To<LanguageDTO>();
        } 
    }
}