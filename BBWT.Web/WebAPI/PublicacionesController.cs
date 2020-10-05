namespace BBWT.Web.WebAPI
{
    using System.Linq;
    using System.Web.Http;
    using BBWT.Web.Controllers;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using BBWT.Data.DAD;
    using BBWT.Data.Demo;
    using BBWT.DTO.Demo;
    using BBWT.DTO.Dictionary;
    using BBWT.Services.Interfaces;
    public class PublicacionesController : ApiController
    {
        private readonly IMappingEngine mapper;
        private readonly IPublicacionService publicacionesService;

        public PublicacionesController(
            IPublicacionService publicacionesService, 
            IMappingEngine mapper)
        {
            this.publicacionesService = publicacionesService;
            this.mapper = mapper;
        }

        /// <summary>
        /// Register Publicacion
        /// </summary>
        /// <param name="dto">Publicacion dto</param>
        public void RegisterPublicacion(PublicacionDTO dto)
        {
        }

        /// <summary>
        /// Delete Publicacion
        /// </summary>
        /// <param name="id">Publicacion id</param>
        [HttpGet]
        public void DeletePublicacion(int id)
        {
        }

        /// <summary>
        /// get all Publicacion
        /// </summary>
        /// <returns>Publicacion list</returns>
        [HttpGet]
        public IQueryable<PublicacionDTO> GetAllPublicacion()
        {
            return this.publicacionesService.GetAllPublicacion().Project().To<PublicacionDTO>();
        }

        /// <summary>
        /// get Publicacion by id
        /// </summary>
        /// <param name="id">Publicacion id</param>
        /// <returns>Publicacion</returns>
        [HttpGet]
        public PublicacionDTO GetPublicacionById(int id)
        {
            var publicacion = this.publicacionesService.GetPublicacionById(id);
            var publicacionDTO = this.mapper.Map<PublicacionDTO>(publicacion);

            return publicacionDTO;
        }

        /// <summary>
        /// Save Publicacion
        /// </summary>
        /// <param name="dto">Publicacion dto</param>
        [HttpPost]
        public void SavePublicacion(PublicacionDTO dto)
        {
            if (dto.Id == 0)
            {
                var publicacion = this.mapper.Map<Publicacion>(dto);
                publicacion.VideoImage = Controllers.UploadController.VideoImageName;
                this.publicacionesService.CreatePublicacion(publicacion);
            }
            else
            {
                this.publicacionesService.UpdatePublicacion(
                    dto.Id,
                    publicacion => this.mapper.Map(dto, publicacion));
            }
        }

    }
}
