namespace BBWT.Domain
{
    using System;
    using System.Data.Common;
    using System.Data.Entity;
    using BBWT.Data.DAD;
    using BBWT.Data;
    using BBWT.Data.Content;
    using BBWT.Data.Demo;
    using BBWT.Data.Membership;
    using BBWT.Data.Menu;
    using BBWT.Data.Security;
    using BBWT.Data.Template;

    /// <summary>
    /// Data context interface
    /// </summary>
    public interface IDataContext : IDisposable
    {
        IDbSet<UserOrderProducs> UserOrderProducs { get; set; }
        IDbSet<ProductType> ProductTypes { get; set; }
        IDbSet<ProductCategory> ProductCategories { get; set; }

        /// <summary>
        /// Cart Items
        /// </summary>
        IDbSet<Category> Categories { get; set; }

        /// <summary>
        /// Cart Items
        /// </summary>
        IDbSet<Cart> CartItems { get; set; }

        /// <summary>
        /// Users collection
        /// </summary>
        IDbSet<User> Users { get; set; }

        /// <summary>
        /// User settings
        /// </summary>
        IDbSet<UserSettings> UserSettings { get; set; }

        /// <summary>
        /// Roles collection
        /// </summary>
        IDbSet<Role> Roles { get; set; }

        /// <summary>
        /// Groups collecton
        /// </summary>
        IDbSet<Group> Groups { get; set; }

        /// <summary>
        /// Permissions collection
        /// </summary>        
        IDbSet<Permission> Permissions { get; set; }

        /// <summary>
        /// List of test products
        /// </summary>
        IDbSet<TestProduct> TestProducts { get; set; }

        /// <summary>
        /// List of menu items
        /// </summary>
        IDbSet<MenuItem> MenuItems { get; set; }

        /// <summary>
        /// List of companies
        /// </summary>
        IDbSet<Company> Companies { get; set; }

        /// <summary>
        /// Security Tickets repository
        /// </summary>
        IDbSet<SecurityTicket> SecurityTickets { get; set; }

        /// <summary>
        /// User Security Tickets repository
        /// </summary>
        IDbSet<UserSecurityTicket> UserSecurityTickets { get; set; }

        /// <summary>
        /// Company Security Tickets repository
        /// </summary>
        IDbSet<CompanySecurityTicket> CompanySecurityTickets { get; set; }

        /// <summary>
        /// Email Template parameters repository
        /// </summary>
        IDbSet<TemplateParameter> TemplateParameters { get; set; }

        /// <summary>
        /// Email Templates repository
        /// </summary>
        IDbSet<EmailTemplate> EmailTemplates { get; set; }

        /// <summary>
        /// Custom content items repository
        /// </summary>
        IDbSet<CustomContent> CustomContents { get; set; }

        // Demo project entries

        /// <summary>
        /// Products repository
        /// </summary>
        IDbSet<Product> Products { get; set; }

        /// <summary>
        /// Territories repository
        /// </summary>
        IDbSet<Territory> Territories { get; set; }

        /// <summary>
        /// Orders repository
        /// </summary>
       // IDbSet<Order> Orders { get; set; }

        /// <summary>
        /// Customers repository
        /// </summary>
        IDbSet<Customer> Customers { get; set; }

        /// <summary>
        /// User languages
        /// </summary>
        IDbSet<Language> Languages { get; set; }

        /// <summary>
        /// Publicaciones
        /// </summary>
        IDbSet<Publicacion> Publicaciones { get; set; }

        /// <summary>
        /// Order
        /// </summary>
        IDbSet<Order> Order { get; set; }

        // End of demo entries section

        /// <summary>
        /// Current Database Connection
        /// </summary>
        DbConnection Connection { get; }

        /// <summary>
        /// Commit changes to database
        /// </summary>
        void Commit();

        /// <summary>
        /// Revert database changes
        /// </summary>
        void Rollback();
    }
}
