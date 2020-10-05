namespace BBWT.Web.App_Start
{
    using System;
    using System.Linq;

    using AutoMapper;

    using BBWT.Data.Content;
    using BBWT.Data.Demo;
    using BBWT.Data.DAD;
    using BBWT.Data.Membership;
    using BBWT.Data.Menu;
    using BBWT.Data.Reports.SqlBrowser;
    using BBWT.Data.Template;
    using BBWT.DTO;
    using BBWT.DTO.Content;
    using BBWT.DTO.Demo;
   // using BBWT.DTO.DAD;
    using BBWT.DTO.Dictionary;
    using BBWT.DTO.Membership;
    using BBWT.DTO.Reports;
    using BBWT.DTO.Reports.SqlBrowser;
    using BBWT.DTO.Template;
    using BBWT.SSRS.Models;

    /// <summary>
    /// Automapper configuration
    /// </summary>
    public static class MapperConfig
    {
        /// <summary>
        /// Register mapping configurations
        /// </summary>
        public static void Initialize()
        {
            RegisterDictionaries();
            RegisterUserMap();
            RegisterGroupMap();
            RegisterRoleMap();
            RegisterPermissionMap();
            RegisterMenuMap();
            RegisterCompanyMap();

            //RegisterDemoMap();
            RegisterAnimmaxMap();
            RegisterEmailTemplateMap();
            RegisterContentMap();

            RegisterReportMap();
            RegisterSqlBrowserMap();

            RegisterPublicacion();

            RegisterCart();

            RegisterCategories();
            RegisterProductCategories();
            RegisterProductTypes();

            RegisterOrders();
            RegisterUserOrderProducs();
        }

        private static void RegisterUserOrderProducs()
        {
            Mapper.CreateMap<UserOrderProducs, UserOrderProducsDTO>();
        }

        private static void RegisterOrders()
        {
            Mapper.CreateMap<Order, OrderDTO>();
        }
        private static void RegisterProductCategories()
        {
            Mapper.CreateMap<ProductCategory, ProductCategoryDTO>();
        }

        private static void RegisterProductTypes()
        {
            Mapper.CreateMap<ProductType, ProductTypeDTO>();
        }

        private static void RegisterCategories()
        {
            Mapper.CreateMap<Category, CategoryDTO>();
        }
        private static void RegisterCart()
        {
            Mapper.CreateMap<Cart, CartDto>();
        }

        private static void RegisterPublicacion()
        {
            Mapper.CreateMap<Publicacion, PublicacionDTO>();
            Mapper.CreateMap<PublicacionDTO, Publicacion>();
        }

        private static void RegisterContentMap()
        {
            Mapper.CreateMap<CustomContent, CustomContentDTO>();
            Mapper.CreateMap<CustomContent, CustomContentItemDTO>();
            Mapper.CreateMap<CustomContentItemDTO, CustomContent>();
        }

        private static void RegisterDictionaries()
        {
            Mapper.CreateMap<Language, LanguageDTO>();
        }

        private static void RegisterAnimmaxMap()
        {
            Mapper.CreateMap<Customer, CustomerDTO>();

            Mapper.CreateMap<Product, ProductDTO>();
            Mapper.CreateMap<ProductDTO, Product>();

            Mapper.CreateMap<Product, ProductDataDTO>();
            Mapper.CreateMap<ProductDataDTO, Product>();

            Mapper.CreateMap<Product, ProductDataDTO>();
            Mapper.CreateMap<ProductDataDTO, Product>();

            Mapper.CreateMap<Territory, TerritoryDTO>();
            Mapper.CreateMap<TerritoryDTO, Territory>();
        }
        private static void RegisterDemoMap()
        {
           
            Mapper.CreateMap<Order, OrderDTO>();
            Mapper.CreateMap<OrderDTO, Order>()
                  .ForMember(d => d.OrderDetails, r => r.Ignore())
                  .ForMember(
                      d => d.Customer,
                      r => r.MapFrom(
                          s => new Customer
                                   {
                                       Code = s.CustomerCode,
                                       CompanyName = s.CustomerCompanyName
                                   }));
            Mapper.CreateMap<OrderDetail, OrderDetailDTO>();
        }

        private static void RegisterUserMap()
        {
            Mapper.CreateMap<UserSettings, UserSettingsDto>();

            Mapper.CreateMap<RegisterUserDTO, User>();
            Mapper.CreateMap<UpdateUserDTO, User>()
                .AfterMap((dto, user) => { user.UserSettings.LanguageId = dto.LanguageId; });

            Mapper.CreateMap<User, AccountDTO>()
                .ForMember(d => d.FullName, r => r.MapFrom(s => s.FirstName + " " + s.Surname));

            Mapper.CreateMap<User, UserDTO>();
            Mapper.CreateMap<UserDTO, User>()
                  .ForMember(d => d.Groups, r => r.Ignore())
                  .ForMember(d => d.Roles, r => r.Ignore())
                  .ForMember(d => d.Permissions, r => r.Ignore());

            Mapper.CreateMap<User, SelectedUserDTO>()
                .ForMember(u => u.IsChecked, d => d.UseValue(false))
                .ForMember(d => d.FullName, r => r.MapFrom(s => s.FirstName + " " + s.Surname));
        }

        private static void RegisterGroupMap()
        {
            Mapper.CreateMap<Group, CheckBoxItemDTO>().ForMember(d => d.Id, r => r.MapFrom(s => s.Id));
            Mapper.CreateMap<Group, GroupDTO>();
            Mapper.CreateMap<Group, GroupsListItemDTO>();
            Mapper.CreateMap<GroupDTO, Group>()
                .ForMember(d => d.Roles, r => r.Ignore())
                .ForMember(d => d.Permissions, r => r.Ignore());
        }

        private static void RegisterRoleMap()
        {
            Mapper.CreateMap<Role, RoleDTO>();
            Mapper.CreateMap<Role, RolesListItemDTO>();
            Mapper.CreateMap<RoleDTO, Role>().ForMember(d => d.Permissions, r => r.Ignore());
            Mapper.CreateMap<Role, CheckBoxItemDTO>().ForMember(d => d.Id, r => r.MapFrom(s => s.Id));
        }

        private static void RegisterPermissionMap()
        {
            Mapper.CreateMap<Permission, PermissionDTO>()
                  .ForMember(m => m.IsSystem, o => o.MapFrom(s => s.Id < 1000))
                  .ForMember(m => m.HasParameter, o => o.MapFrom(s => s.IsParameterised));

            Mapper.CreateMap<Permission, PermissionDetailsDTO>();
            Mapper.CreateMap<PermissionDetailsDTO, Permission>();
            Mapper.CreateMap<Permission, CheckBoxItemDTO>().ForMember(d => d.Id, r => r.MapFrom(s => s.Id));
            Mapper.CreateMap<AssignedPermission, CheckBoxItemDTO>()
                .ForMember(d => d.Id, r => r.MapFrom(s => s.LinkedPermission.Id))
                .ForMember(d => d.Param, r => r.MapFrom(s => s.ParameterValue));
        }

        private static void RegisterMenuMap()
        {
            ////Mapper.CreateMap<MenuItem, MenuItemDTO>()
            ////    .ForMember(d => d.Text, r => r.MapFrom(s => s.Name))
            ////    .ForMember(d => d.URL, r => r.MapFrom(s => s.Url));
            Mapper.CreateMap<MenuItem, MenuItemDTO>()
                .ForMember(d => d.Name, r => r.MapFrom(s => s.Name))
                .ForMember(d => d.Id, r => r.MapFrom(s => s.Id))
                .ForMember(d => d.ParentId, r => r.MapFrom(s => s.ParentId))
                .ForMember(d => d.Order, r => r.MapFrom(s => s.Order))
                .ForMember(d => d.Url, r => r.MapFrom(s => s.Url));
        }

        private static void RegisterCompanyMap()
        {
            Mapper.CreateMap<Company, CompanyListItemDTO>()
                .ForMember(m => m.UsersNum, r => r.MapFrom(c => c.Users.Count));

            Mapper.CreateMap<RegisterCompanyDTO, Company>()
                .ForMember(d => d.MainContactAddress, r => r.MapFrom(s => string.Format("{0}\r\n{1}", s.MainContactAddress1, s.MainContactAddress2)))
                .ForMember(d => d.BillingContactAddress, r => r.MapFrom(s => string.Format("{0}\r\n{1}", s.BillingContactAddress1, s.BillingContactAddress2)))
                .ForMember(d => d.Groups, r => r.Ignore())
                .ForMember(d => d.Permissions, r => r.Ignore());

            Mapper.CreateMap<CompanyDTO, Company>()
                .ForMember(d => d.MainContactAddress, r => r.MapFrom(s => string.Format("{0}\r\n{1}", s.MainContactAddress1, s.MainContactAddress2)))
                .ForMember(d => d.BillingContactAddress, r => r.MapFrom(s => string.Format("{0}\r\n{1}", s.BillingContactAddress1, s.BillingContactAddress2)))
                ////.ForMember(d => d.Companies, r => r.Ignore())
                .ForMember(d => d.Groups, r => r.Ignore())
                .ForMember(d => d.Permissions, r => r.Ignore());

            Mapper.CreateMap<Company, CompanyDTO>()
              .ForMember(
                  d => d.MainContactAddress1,
                  r =>
                  r.MapFrom(
                      s =>
                      s.MainContactAddress.Split(
                      new[] 
                          { 
                              "\r\n" 
                          },
                StringSplitOptions.None).ElementAtOrDefault(0)))
              .ForMember(
                  d => d.MainContactAddress2,
                  r =>
                  r.MapFrom(
                      s =>
                      s.MainContactAddress.Split(
                      new[] 
                          { 
                              "\r\n" 
                          },
              StringSplitOptions.None).ElementAtOrDefault(1)))
              .ForMember(
                  d => d.BillingContactAddress1,
                  r =>
                  r.MapFrom(
                      s =>
                      s.BillingContactAddress.Split(
                      new[] 
                          { 
                              "\r\n" 
                          },
              StringSplitOptions.None).ElementAtOrDefault(0)))
              .ForMember(
                  d => d.BillingContactAddress2,
                  r =>
                  r.MapFrom(
                      s =>
                      s.BillingContactAddress.Split(
                      new[] 
                          { 
                              "\r\n" 
                          },
              StringSplitOptions.None).ElementAtOrDefault(1)));
        }

        private static void RegisterEmailTemplateMap()
        {
            Mapper.CreateMap<EmailTemplate, EmailTemplateDTO>();

            Mapper.CreateMap<EmailTemplate, EmailTemplateDetailsDTO>();
            Mapper.CreateMap<EmailTemplateDetailsDTO, EmailTemplate>()
                .ForMember(it => it.Parameters, d => d.Ignore());

            Mapper.CreateMap<TemplateParameter, TemplateParameterDTO>();

            ////Mapper.CreateMap<TemplateParameterDTO, TemplateParameter>();
        }

        private static void RegisterReportMap()
        {
            Mapper.CreateMap<SsrsParameterValues, ParameterValuesDTO>();
            Mapper.CreateMap<ParameterValuesDTO, SsrsParameterValues>();
            Mapper.CreateMap<SsrsParameter, ParameterDTO>().ForSourceMember(s => s.Value, s => s.Ignore()).ForMember(dest => dest.Value, dest => dest.Ignore());
            Mapper.CreateMap<ParameterDTO, SsrsParameter>().ForSourceMember(s => s.Value, s => s.Ignore()).ForMember(dest => dest.Value, dest => dest.Ignore());
            Mapper.CreateMap<SsrsReport, ReportDTO>();
        }

        private static void RegisterSqlBrowserMap()
        {
            Mapper.CreateMap<DatabaseDescriptor, DatabaseDescriptorDTO>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.dbid))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.name));

            Mapper.CreateMap<ColumnDescriptor, ColumnDescriptorDTO>();
            Mapper.CreateMap<QueryExecutionResult, QueryExecutionResultDTO>();
        }
    }
}