namespace BBWT.Web.WebAPI
{
    using System;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Web.Http;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using BBWT.Data.Template;
    using BBWT.DTO.Template;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// The EmailTemplateController class
    /// </summary>
    public class EmailTemplateController : ApiController
    {
        private readonly IEmailTemplateService service;
        private readonly IMappingEngine mapper;
    
        /// <summary>Constructs EmailTemplates controller</summary>
        /// <param name="srv">data service injection</param>
        /// <param name="mapper">Mapper instance</param>
        public EmailTemplateController(IEmailTemplateService srv, IMappingEngine mapper)
        {
            this.service = srv;
            this.mapper = mapper;
        }

        /// <summary>
        /// The Get All Templates
        /// </summary>
        /// <returns>Query results of EmailTemplateDTO</returns>
        public IQueryable<EmailTemplateDetailsDTO> GetAllTemplates()
        {
            var templatesDTO = this.service.GetAllTemplates().Project().To<EmailTemplateDetailsDTO>();

            return templatesDTO;
        }

        /// <summary>
        /// The Get Template by Id
        /// </summary>
        /// <param name="id">The template id</param>
        /// <returns>The EmailTemplateDTO</returns>
        public EmailTemplateDetailsDTO GetTemplateById(int id)
        {
            var template = id == 0 ? NewTemplate() : this.service.GetTemplateById(id);
            
            var templateDTO = this.mapper.Map<EmailTemplateDetailsDTO>(template);
            var sysParams = this.service.GetSystemParameters().Project().To<TemplateParameterDTO>().ToList();

            templateDTO.Parameters.AddRange(sysParams);
            templateDTO.Parameters.Sort((it1, it2) => it1.Title.CompareTo(it2.Title));

            return templateDTO;
        }

        /// <summary>
        /// The GetTemplate
        /// </summary>
        /// <param name="code">The template code</param>
        /// <returns>EmailTemplateDTO</returns>
        public EmailTemplateDetailsDTO GetTemplateByCode(string code)
        {
            var template = string.IsNullOrEmpty(code) ? NewTemplate() : this.service.GetTemplateByCode(code);
            var templateDTO = this.mapper.Map<EmailTemplateDetailsDTO>(template);

            return templateDTO;
        }

        /// <summary>
        /// The Save template
        /// </summary>
        /// <param name="templateDTO">The template DTO</param>
        public void SaveTemplate(EmailTemplateDetailsDTO templateDTO)
        {
            if (templateDTO == null)
            {
                throw new ArgumentNullException("TemplateDTO");
            }

            var test = this.service.GetTemplateByCode(templateDTO.Code);

            if (templateDTO.Id == 0)
            {
                if (test != null)
                {
                    throw new ArgumentException("Email template with this code already exist.", "Code");
                }

                var template = this.mapper.Map<EmailTemplate>(templateDTO);
                this.service.Save(template);
            }
            else
            {
                if (test != null && test.Id != templateDTO.Id)
                {
                    throw new ArgumentException("Email template with this code already exist.", "Code");
                }

                this.service.Update(
                    templateDTO.Id,
                    template =>
                    {
                        template.Title = templateDTO.Title.Trim();
                        template.From = templateDTO.From.Trim();
                        template.Subject = templateDTO.Subject.Trim();
                        template.Message = templateDTO.Message.Trim();
                        template.Notes = templateDTO.Notes.Trim();
                    });
            }
        }

        /// <summary>
        /// The Delete template
        /// </summary>
        /// <param name="id">The template id</param>
        [HttpGet]
        public void DeleteTemplate(int id)
        {
            var template = this.service.GetTemplateById(id);
            if (template == null)
            {
                throw new ArgumentException("Email template missing.", "Id");
            }
                
            if (template.IsSystem)
            {
                throw new ArgumentException("System Email Template cannot be deleted.");
            }

            this.service.Delete(template);
        }

        private static EmailTemplate NewTemplate()
        {
            var template = new EmailTemplate
            {
                Id = 0,
                Code = string.Empty,
                Title = string.Empty,
                IsSystem = false,
                From = string.Empty,
                Subject = string.Empty,
                Message = string.Empty,
                Notes = Domain.Notifications.BaseTemplateLegend,
                Parameters = new Collection<TemplateParameter>()
            };

            return template;
        }
    }
}
