namespace BBWT.Domain
{
    using System;
    using System.Data.Common;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.ModelConfiguration;
    using System.Linq;
    using System.Reflection;

    using BBWT.Data;
    using BBWT.Data.DAD;
    using BBWT.Data.Content;
    using BBWT.Data.Demo;
    using BBWT.Data.Membership;
    using BBWT.Data.Menu;
    using BBWT.Data.Security;
    using BBWT.Data.Template;
    using BBWT.Domain.Migrations;
    using Common.Logging;

    /// <summary>
    /// Data context definition
    /// </summary>
    public class DataContext : DbContext, IDataContext
    {
        /// <summary>
        /// Definition of database initialization strategy
        /// </summary>
        static DataContext()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<DataContext, Configuration>());
        }

        /// <summary>
        /// Constructs new instance of <see cref="DataContext"/>
        /// </summary>
        public DataContext()
            : base("DefaultConnection")
        {
            Database.Initialize(false);            

            this.Users = this.Set<User>();

            this.Languages = this.Set<Language>();

            this.UserSettings = this.Set<UserSettings>();

            this.Roles = this.Set<Role>();

            this.Groups = this.Set<Group>();

            this.Permissions = this.Set<Permission>();

            this.TestProducts = this.Set<TestProduct>();

            this.Companies = this.Set<Company>();

            this.SecurityTickets = this.Set<SecurityTicket>();

            this.UserSecurityTickets = this.Set<UserSecurityTicket>();

            this.CompanySecurityTickets = this.Set<CompanySecurityTicket>();

            this.TemplateParameters = this.Set<TemplateParameter>();

            this.EmailTemplates = this.Set<EmailTemplate>();

            this.AssignedPermissions = this.Set<AssignedPermission>();

            this.CustomContents = this.Set<CustomContent>();

            //// this.Dictionaries = this.Set<BasicDictionary>();

            this.Territories = this.Set<Territory>();

            this.Products = this.Set<Product>();

            //this.Orders = this.Set<Order>();

            this.Customers = this.Set<Customer>();

            this.Publicaciones = this.Set<Publicacion>();

            this.CartItems = this.Set<Cart>();

            this.Categories = this.Set<Category>();

            this.ProductTypes = this.Set<ProductType>();

            this.ProductCategories = this.Set<ProductCategory>();

            this.UserOrderProducs = this.Set<UserOrderProducs>();

        }

        public IDbSet<UserOrderProducs> UserOrderProducs { get; set; }
        public IDbSet<Order> Order { get; set; }
        public IDbSet<ProductType> ProductTypes { get; set; }
        public IDbSet<ProductCategory> ProductCategories { get; set; }

        public IDbSet<Category> Categories { get; set; }

        /// <summary>
        /// Cart Items
        /// </summary>
        public IDbSet<Cart> CartItems { get; set; }

        /// <summary>
        /// Users collection
        /// </summary>
        public IDbSet<User> Users { get; set; }

        /// <summary>
        /// User settings
        /// </summary>
        public IDbSet<UserSettings> UserSettings { get; set; }

        /// <summary>
        /// Roles collection
        /// </summary>
        public IDbSet<Role> Roles { get; set; }

        /// <summary>
        /// Groups collecton
        /// </summary>
        public IDbSet<Group> Groups { get; set; }

        /// <summary>
        /// List of menu items
        /// </summary>
        public IDbSet<MenuItem> MenuItems { get; set; }

        /// <summary>
        /// Permissions collection
        /// </summary>
        public IDbSet<Permission> Permissions { get; set; }

        /// <summary>
        /// List of companies
        /// </summary>
        public IDbSet<Company> Companies { get; set; }

        /// <summary>
        /// General Security Tickets repository
        /// </summary>
        public IDbSet<SecurityTicket> SecurityTickets { get; set; }

        /// <summary>
        /// User Security Tickets repository
        /// </summary>
        public IDbSet<UserSecurityTicket> UserSecurityTickets { get; set; }

        /// <summary>
        /// Company Security Tickets repository
        /// </summary>
        public IDbSet<CompanySecurityTicket> CompanySecurityTickets { get; set; }

        /// <summary>
        /// List of test products
        /// </summary>
        public IDbSet<TestProduct> TestProducts { get; set; }

        /// <summary>
        /// List of Template parameters
        /// </summary>
        public IDbSet<TemplateParameter> TemplateParameters { get; set; }

        /// <summary>
        /// List of Email Templates
        /// </summary>
        public IDbSet<EmailTemplate> EmailTemplates { get; set; }

        /// <summary>
        /// Custom content items repository
        /// </summary>
        public IDbSet<CustomContent> CustomContents { get; set; }

        /// <summary>
        /// List of products
        /// </summary>
        public IDbSet<Product> Products { get; set; }

        /// <summary>
        /// List of territories
        /// </summary>
        public IDbSet<Territory> Territories { get; set; }

        /// <summary>
        /// List of orders
        /// </summary>
       // public IDbSet<Order> Orders { get; set; }

        /// <summary>
        /// List of customers
        /// </summary>
        public IDbSet<Customer> Customers { get; set; }

        /// <summary>
        /// User languages
        /// </summary>
        public IDbSet<Language> Languages { get; set; }

        /// <summary>
        /// Publicaciones
        /// </summary>
        public IDbSet<Publicacion> Publicaciones { get; set; }

        /// <summary>
        /// Current Database Connection
        /// </summary>
        /// <remarks>Be careful with low-level connection object!</remarks>
        public DbConnection Connection 
        {
            get
            {
                return this.Database.Connection;
            }
        }

        /// <summary>
        /// List of assigned permissions (internal use only)
        /// </summary>
        private IDbSet<AssignedPermission> AssignedPermissions { get; set; }

        ///// <summary>
        ///// Dictionary base collection
        ///// </summary>
        // public IDbSet<BasicDictionary> Dictionaries { get; set; }

        /// <summary>
        /// Commit changes
        /// </summary>
        public void Commit()
        {
            // Delete orphan permission records
            this.AssignedPermissions.Local.Where(it => it.LinkedPermission == null).ToList()
                .ForEach(it => this.AssignedPermissions.Remove(it));

            this.SaveChanges();
        }

        /// <summary>
        /// Revert changes
        /// </summary>
        public void Rollback()
        {
            var changedEntries = this.ChangeTracker.Entries().Where(x => x.State != EntityState.Unchanged).ToList();

            foreach (var entry in changedEntries.Where(x => x.State == EntityState.Modified))
            {
                entry.CurrentValues.SetValues(entry.OriginalValues);
                entry.State = EntityState.Unchanged;
            }

            foreach (var entry in changedEntries.Where(x => x.State == EntityState.Added))
            {
                entry.State = EntityState.Detached;
            }

            foreach (var entry in changedEntries.Where(x => x.State == EntityState.Deleted))
            {
                entry.State = EntityState.Unchanged;
            }
        }

        /// <summary>Dispose custom database context</summary>
        /// <param name="disposing">true if both managed/unmanaged resource should be disposed</param>
        protected override void Dispose(bool disposing)
        {
            try
            {
                if (this.ChangeTracker.HasChanges())
                {
                    var changedEntries = this.ChangeTracker.Entries().Where(x => x.State != EntityState.Unchanged).ToList();
                   
                    var log = LogManager.GetCurrentClassLogger();
                    log.Error("Database context has unsaved changes");
                    throw new DbUpdateException("Database context has unsaved changes");
                }
            }
            finally
            {
                base.Dispose(disposing);
            }
        }

        /// <summary>Define default mapping rules</summary>
        /// <param name="modelBuilder">Default model builder</param>
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /*
            modelBuilder.Conventions.Remove<IncludeMetadataConvention>();
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            */
            this.RegisterConfigurations(modelBuilder);
        }

        /// <summary>Maps registration</summary>
        /// <param name="modelBuilder">Default model builder</param>
        private void RegisterConfigurations(DbModelBuilder modelBuilder)
        {
            if (modelBuilder == null)
            {
                throw new ArgumentNullException("modelBuilder");
            }

            Assembly.GetExecutingAssembly()
                    .GetTypes()
                    .Where(
                        type =>
                        type.BaseType != null && type.BaseType.IsGenericType
                        && type.BaseType.GetGenericTypeDefinition() == typeof(EntityTypeConfiguration<>))
                    .ToList()
                    .ForEach(
                        type =>
                        {
                            dynamic instance = Activator.CreateInstance(type);
                            modelBuilder.Configurations.Add(instance);
                        });
        }
    }
}