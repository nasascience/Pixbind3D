namespace BBWT.Web.WebAPI
{
    using System.Linq;
    using System.Web.Http;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using BBWT.Data.Content;
    using BBWT.DTO.Content;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// Custom Content controller
    /// </summary>
    public class CustomContentController
    {
        private readonly IMappingEngine mapper;
        private readonly ICustomContentService service;

        /// <summary>
        /// Constructs custom content controller
        /// </summary>
        /// <param name="map">AutoMapper instance</param>
        /// <param name="svc">Custon Content service</param>
        public CustomContentController(IMappingEngine map, ICustomContentService svc)
        {
            this.mapper = map;
            this.service = svc;
        }

        /// <summary>
        /// Get list of roles
        /// </summary>
        /// <returns>List of roles</returns>
        [HttpGet]
        public IQueryable<CustomContentDTO> GetAllContents()
        {
            return this.service.GetAllContents().Project().To<CustomContentDTO>();
        }

        /// <summary>Delete content by id</summary>
        /// <param name="id">content id</param>
        [HttpGet]
        public void DeleteContent(int id)
        {
            this.service.Delete(id);
        }

        /// <summary>
        /// Get custom content item by id
        /// </summary>
        /// <param name="id">item id</param>
        /// <returns>content</returns>
        public CustomContentItemDTO GetById(int id)
        {
            var content = this.service.GetContentById(id);
            return this.mapper.Map<CustomContentItemDTO>(content);
        }

        /// <summary>Create or update content</summary>
        /// <param name="dto">content DTO</param>
        [HttpPost]
        public void SaveContent(CustomContentItemDTO dto)
        {
            if (dto.Id == 0)
            {
                var content = this.mapper.Map<CustomContent>(dto);

                this.service.CreateContent(content);
            }
            else
            {
                this.service.UpdateContent(
                    dto.Id,
                    (content) =>
                    {
                        this.mapper.Map(dto, content);
                    });
            }
        }
    }
}