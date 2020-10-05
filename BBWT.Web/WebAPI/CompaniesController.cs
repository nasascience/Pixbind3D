namespace BBWT.Web.WebAPI
{
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Web.Http;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using BBWT.Data.Membership;
    using BBWT.DTO;
    using BBWT.DTO.Membership;
    using BBWT.Services.Interfaces;

    /// <summary>
    /// API controller to work on companies collection
    /// </summary>
    public class CompaniesController : ApiController
    {
        private readonly IMappingEngine mapper;
        private readonly IMembershipService membershipService;

        /// <summary>
        /// Constructs new instance of <see cref="GroupsController"/>
        /// </summary>
        /// <param name="membershipService">membership service instance</param>
        /// <param name="mapper">Mapper instance</param>
        public CompaniesController(IMembershipService membershipService, IMappingEngine mapper)
        {
            this.membershipService = membershipService;
            this.mapper = mapper;
        }

        /// <summary>
        /// Register a new company
        /// </summary>
        /// <param name="dto">
        /// The company data
        /// </param>
        public void RegisterCompany(RegisterCompanyDTO dto)
        {
            var companyPermission = this.membershipService.GetPermissionById(Permission.CompanyAdmin);

            var company = this.mapper.Map<Company>(dto);
            this.membershipService.CreateCompany(company);

            var adminPermission = new AssignedPermission { LinkedPermission = companyPermission, ParameterValue = company.Id.ToString(CultureInfo.InvariantCulture) };

            var user = new User
            {
                FirstName = dto.FirstName,
                Name = dto.Email,
                Surname = dto.Surname,
                Permissions = new[] { adminPermission }
            };

            this.membershipService.CreateUser(user, dto.Password);
        }

        /// <summary>Delete Company by id</summary>
        /// <param name="id">Company id</param>
        [HttpGet]
        public void DeleteCompany(int id)
        {
            this.membershipService.DeleteCompany(id);
        }

        /// <summary>
        /// Get list of Companies
        /// </summary>
        /// <returns>List of Companies</returns>
        [HttpGet]
        public IQueryable<CompanyDTO> GetAllCompanies()
        {
            return this.membershipService.GetAllCompanies().Project().To<CompanyDTO>();
        }

        /// <summary>Get single Company by id</summary>
        /// <param name="id">Company id</param>
        /// <returns>Company</returns>
        [HttpGet]
        public CompanyDTO GetCompanyById(int id)
        {
            var company = this.membershipService.GetCompanyById(id);
            var companyDTO = this.mapper.Map<CompanyDTO>(company);

            var permissionsDTO = this.membershipService.GetAllPermissions().Project().To<CheckBoxItemDTO>().ToList();
            permissionsDTO.ForEach(it => it.IsChecked = company.Permissions.Any(p => p.LinkedPermission.Id == it.Id));

            var groupsDTO = this.membershipService.GetAllGroups().Project().To<CheckBoxItemDTO>().ToList();
            groupsDTO.ForEach(it => it.IsChecked = company.Groups.Any(p => p.Id == it.Id));

            companyDTO.Permissions = permissionsDTO;
            companyDTO.Groups = groupsDTO;

            return companyDTO;
        }

        /// <summary>Create or update Company</summary>
        /// <param name="dto">Company DTO</param>
        [HttpPost]
        public void SaveCompany(CompanyDTO dto)
        {
            if (dto.Id == 0)
            {
                var company = this.mapper.Map<Company>(dto);

                company.Permissions = new List<AssignedPermission>();
                company.Groups = new List<Group>();

                this.UpdatePermissionsCollection(company.Permissions, dto.Permissions);
                this.UpdateGroupsCollection(company.Groups, dto.Groups);

                this.membershipService.CreateCompany(company);
            }
            else
            {
                this.membershipService.UpdateCompany(
                    dto.Id,
                    (company) =>
                    {
                        this.mapper.Map(dto, company);

                        this.UpdateGroupsCollection(company.Groups, dto.Groups);
                        this.UpdatePermissionsCollection(company.Permissions, dto.Permissions);
                    });
            }
        }

        private void UpdatePermissionsCollection(ICollection<AssignedPermission> permissions, IList<CheckBoxItemDTO> dtos)
        {
            if (permissions == null || dtos == null)
            {
                return;
            }

            foreach (var perm in dtos)
            {
                var item = permissions.FirstOrDefault(p => p.LinkedPermission.Id == perm.Id);

                if (perm.IsChecked)
                {
                    if (item == null)
                    {
                        permissions.Add(new AssignedPermission { LinkedPermission = this.membershipService.GetPermissionById(perm.Id) });
                    }
                }
                else
                {
                    if (item != null)
                    {
                        permissions.Remove(item);
                        item.LinkedPermission = null;
                    }
                }
            }
        }

        private void UpdateGroupsCollection(ICollection<Group> groups, IList<CheckBoxItemDTO> dtos)
        {
            if (groups == null || dtos == null)
            {
                return;
            }

            foreach (var grp in dtos)
            {
                var item = groups.FirstOrDefault(p => p.Id == grp.Id);

                if (grp.IsChecked)
                {
                    if (item == null)
                    {
                        groups.Add(this.membershipService.GetGroupById(grp.Id));
                    }
                }
                else
                {
                    if (item != null)
                    {
                        groups.Remove(item);
                    }
                }
            }
        }
    }
}