namespace BBWT.Domain.Migrations
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.Entity.Migrations;
    using System.Diagnostics.CodeAnalysis;
    using System.IO;
    using System.Linq;
    using System.Reflection;

    using BBWT.Data;
    using BBWT.Data.Demo;
    using BBWT.Data.DAD;
    using BBWT.Data.Membership;
    using BBWT.Data.Menu;
    using BBWT.Data.Template;

    using WebMatrix.WebData;

    /// <summary>
    /// The configuration.
    /// </summary>
    public sealed class Configuration : DbMigrationsConfiguration<DataContext>
    {
        /// <summary>
        /// Configuration constructor
        /// </summary>
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true;
            
            // Comment the line below if you afraid that critical data can be lost
            this.AutomaticMigrationDataLossAllowed = true;
        }

        /// <summary>
        /// The seed menu.
        /// </summary>
        /// <param name="context">
        /// The data context
        /// </param>
        [SuppressMessage("StyleCop.CSharp.LayoutRules", "SA1500:CurlyBracketsForMultiLineStatementsMustNotShareLine", Justification = "Reviewed. Suppression is OK here.")]
        public static void SeedMenu(IDataContext context)
        {
            if (!context.MenuItems.Any())
            {
                var menuData = new List<MenuItem> 
            {
                new MenuItem { Id = 100, Name = "Home", Url = "/", Order = 10 },

               // new MenuItem { Id = 200, Name = "Blog", Url = "/blog", Order = 20 },

                new MenuItem { Id = 300, Name = "Products", Order = 30 },
                new MenuItem { Id = 301, Name = "Environments", Url = "/environment", ParentId = 300, Order = 31 },
                new MenuItem { Id = 302, Name = "Characters", Url = "/char", ParentId = 300, Order = 32 },
                new MenuItem { Id = 303, Name = "Animations", Url = "/anim", ParentId = 300, Order = 33 },

                new MenuItem { Id = 400, Name = "Contact us", Url = "/#Contact", Order = 40 },

                new MenuItem { Id = 500, Name = "About us", Url = "/#About", Order = 50 }
                /*new MenuItem { Id = 200, Name = "Northwind", Order = 20 },

                new MenuItem { Id = 210, Name = "Manage Orders", Url = "/test/orders", ParentId = 200, Order = 10 },
                new MenuItem { Id = 220, Name = "Manage Orders (Variant)", Url = "/test/ordersvariant", ParentId = 200, Order = 11 },
                new MenuItem { Id = 230, Name = "Manage Territories", Url = "/test/territories", ParentId = 200, Order = 12 },

                new MenuItem { Id = 300, Name = "Test Page", Url = "/test", Order = 30 },

                new MenuItem { Id = 400, Name = "Example Pages", Order = 31 },

                new MenuItem { Id = 410, Name = "Guidelines", Url = "/example/guidelines", ParentId = 400, Order = 10 },
                new MenuItem { Id = 420, Name = "Disabled Controls Testing", Url = "/example/disabled", ParentId = 400, Order = 20 },                                
                new MenuItem { Id = 440, Name = "Grid Filtering", Url = "/test/orderstest", ParentId = 400, Order = 40 },
                new MenuItem { Id = 450, Name = "Wizard", Url = "/example/wizard", ParentId = 400, Order = 50 },
                new MenuItem { Id = 460, Name = "Techniques", Url = "/example/techniques", ParentId = 400, Order = 60 },
                new MenuItem { Id = 470, Name = "Upload", Url = "/example/upload", ParentId = 400, Order = 70 },
                new MenuItem { Id = 480, Name = "Error Handling", Url = "/example/errorhandling", ParentId = 400, Order = 80 },

                new MenuItem { Id = 500, Name = "Demo Pages", Order = 32 },

                new MenuItem { Id = 510, Name = "Simple Page", Url = "/demo/simple", ParentId = 500, Order = 10 },
                new MenuItem { Id = 520, Name = "Tab", Url = "/demo/tab", ParentId = 500, Order = 20 },
                new MenuItem { Id = 530, Name = "Wizard", Url = "/demo/wizard", ParentId = 500, Order = 30 },
                new MenuItem { Id = 540, Name = "Master Detail - Two Pages", Url = "/test/orders", ParentId = 500, Order = 40 },
                new MenuItem { Id = 550, Name = "Master Detail - One Page, Two Columns", Url = "/test/ordersvariant", ParentId = 500, Order = 50 },

                new MenuItem { Id = 600, Name = "Admin", Order = 40 },
                new MenuItem { Id = 610, Name = "System Configuration", Url = "/admin/settings", ParentId = 600, Order = 10 },
                new MenuItem { Id = 620, Name = "Manage Companies", Url = "/admin/companies", ParentId = 600, Order = 20 },
                new MenuItem { Id = 630, Name = "Manage Email Templates", Url = "/admin/templates", ParentId = 600, Order = 30 },
                new MenuItem { Id = 640, Name = "Manage Users", Url = "/admin/users", ParentId = 600, Order = 40 },
                new MenuItem { Id = 650, Name = "Manage Groups", Url = "/admin/groups", ParentId = 600, Order = 50 },
                new MenuItem { Id = 660, Name = "Manage Roles", Url = "/admin/roles", ParentId = 600, Order = 60 },
                new MenuItem { Id = 670, Name = "Manage Permissions", Url = "/admin/permissions", ParentId = 600, Order = 70 },                
                new MenuItem { Id = 680, Name = "Manage Menu", Url = "/admin/menu", ParentId = 600, Order = 80 },
                new MenuItem { Id = 690, Name = "Manage Route Access", Url = "/admin/routes", ParentId = 600, Order = 90 },

                new MenuItem { Id = 700, Name = "Reports", Order = 50 },
                new MenuItem { Id = 710, Name = "Reports list", Url = "/reports/index", ParentId = 700, Order = 10 }*/
            };

                foreach (var menuItem in menuData.Where(menuItem => !context.MenuItems.Any(it => it.Id == menuItem.Id)).OrderBy(it => it.Id))
                {
                    context.MenuItems.AddOrUpdate(menuItem);
                    context.Commit();
                }
            }
        }

        /// <summary>
        /// The seed.
        /// </summary>
        /// <param name="context">
        /// The context
        /// </param>
        protected override void Seed(DataContext context)
        {
            // This method will be called after migrating to the latest version.     
            if (!WebSecurity.Initialized)
            {
                WebSecurity.InitializeDatabaseConnection("DefaultConnection", "Users", "UserId", "Name", autoCreateTables: true);
            }

            SeedProductCategories(context);
            SeedProductTypes(context);
            SeedCategories(context);

            SeedLanguages(context);
            SeedCompanies(context);
            SeedPermissions(context);
            SeedRoles(context);
            SeedGroups(context);
            SeedUsers(context);


            if (!context.MenuItems.Any())
            {
                SeedMenu(context);
            }

            SeedProducts(context);

            SeedEmailTemplates(context);
            SeedCommonEmailParameters(context);

            //RunNorthwindScripts(context);

            SeedPublicaciones(context);
        }

        private static void SeedProductCategories(IDataContext context)
        {
            if (!context.ProductCategories.Any())
            {
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 1, Name = "Masculine" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 2, Name = "Feminine" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 3, Name = "Kids" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 4, Name = "Soldier" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 5, Name = "Police" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 6, Name = "Zombie" });

                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 7, Name = "War" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 8, Name = "Horror" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 9, Name = "Landscape" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 10, Name = "Urban" });

                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 12, Name = "Idle" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 13, Name = "Boxing" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 14, Name = "Dance" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 15, Name = "Move" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 16, Name = "Talk" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 17, Name = "Move" });
                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 18, Name = "Strike" });

                context.ProductCategories.AddOrUpdate(new ProductCategory { Id = 19, Name = "Other" });

                context.Commit();
            }
        }

        private static void SeedProductTypes(IDataContext context)
        {
            if (context.ProductTypes.Count() < 5)
            {
                context.ProductTypes.AddOrUpdate(new ProductType { Id = 1, Name = "Assets" });
                context.ProductTypes.AddOrUpdate(new ProductType { Id = 2, Name = "Games" });
                context.ProductTypes.AddOrUpdate(new ProductType { Id = 3, Name = "Projects" });
                context.ProductTypes.AddOrUpdate(new ProductType { Id = 4, Name = "Environment" });
                context.ProductTypes.AddOrUpdate(new ProductType { Id = 5, Name = "Anim" });

                context.Commit();
            }
        }
        private static void SeedCategories(IDataContext context)
        {
            if (!context.Categories.Any())
            {
                context.Categories.AddOrUpdate(new Category { Id = 1, Type = "Char", Name = "Masculine" });
                context.Categories.AddOrUpdate(new Category { Id = 2, Type = "Char", Name = "Feminine" });
                context.Categories.AddOrUpdate(new Category { Id = 3, Type = "Char", Name = "Kids" });
                context.Categories.AddOrUpdate(new Category { Id = 4, Type = "Char", Name = "Soldier" });
                context.Categories.AddOrUpdate(new Category { Id = 4, Type = "Char", Name = "Police" });
                context.Categories.AddOrUpdate(new Category { Id = 5, Type = "Char", Name = "Zombie" });
                context.Categories.AddOrUpdate(new Category { Id = 6, Type = "Char", Name = "Zombie" });

                context.Categories.AddOrUpdate(new Category { Id = 7, Type = "Environment", Name = "War" });
                context.Categories.AddOrUpdate(new Category { Id = 8, Type = "Environment", Name = "Horror" });
                context.Categories.AddOrUpdate(new Category { Id = 9, Type = "Environment", Name = "Landscape" });
                context.Categories.AddOrUpdate(new Category { Id = 10, Type = "Environment", Name = "Urban" });
                context.Categories.AddOrUpdate(new Category { Id = 11, Type = "Environment", Name = "Other" });

                context.Categories.AddOrUpdate(new Category { Id = 12, Type = "Anim", Name = "Idle" });
                context.Categories.AddOrUpdate(new Category { Id = 13, Type = "Anim", Name = "Boxing" });
                context.Categories.AddOrUpdate(new Category { Id = 14, Type = "Anim", Name = "Dance" });
                context.Categories.AddOrUpdate(new Category { Id = 15, Type = "Anim", Name = "Move" });
                context.Categories.AddOrUpdate(new Category { Id = 16, Type = "Anim", Name = "Talk" });
                context.Categories.AddOrUpdate(new Category { Id = 17, Type = "Anim", Name = "Move" });
                context.Categories.AddOrUpdate(new Category { Id = 18, Type = "Anim", Name = "Strike" });
                context.Categories.AddOrUpdate(new Category { Id = 19, Type = "Anim", Name = "Other" });

                context.Commit();
            }
        }

        private static void SeedPublicaciones(IDataContext context)
        {
            if (!context.Publicaciones.Any())
            {
                context.Publicaciones.AddOrUpdate(new Publicacion { Id = 1, VideoURL = "f27oX_drZLw", VideoTitulo = "Has probado la mejor  forma de aprender un idioma?", VideoDescripcion = "Esta aplicacion te ayudará a aprender un idioma de forma divertiva y con motivación.", VideoImage = "img1.jpg" });
                context.Publicaciones.AddOrUpdate(new Publicacion { Id = 2, VideoURL = "JE_xLPjqTm4", VideoTitulo = "La generosidad de la gente jamás te sorprendió tanto", VideoDescripcion = "Todavía hay personas con un buen corazón en el mundo. Este vídeo debería motivarnos a todos.", VideoImage = "img2.jpg" });
                context.Publicaciones.AddOrUpdate(new Publicacion { Id = 3, VideoURL = "MI6fDPRz_f4", VideoTitulo = "Obtuvo un obsequio muy grande para él. Mira con quién decidió compartirlo", VideoDescripcion = "unque todos tenemos la capacidad y oportunidad para hacerlo, no todos somos capaces. Este chico es un ejemplo de lo que podemos hacer por los demas.", VideoImage = "img3.jpg" });
                context.Commit();
            }
        }

        private static void SeedLanguages(IDataContext context)
        {
            context.Languages.AddOrUpdate(new Language { Id = 1, Name = "English(UK)" });
            context.Languages.AddOrUpdate(new Language { Id = 2, Name = "English(United States)" });
            context.Languages.AddOrUpdate(new Language { Id = 3, Name = "Spanish" });
            context.Commit();
        }

        private static void RunNorthwindScripts(IDataContext context)
        {
            if (context.Customers.Any())
            {
                return;
            }

            var assembly = Assembly.GetExecutingAssembly();
            const string ResourceName = "BBWT.Domain.Data.Northwind.sql";

            var command = context.Connection.CreateCommand();

            using (var stream = assembly.GetManifestResourceStream(ResourceName))
            using (var reader = new StreamReader(stream))
            {
                command.CommandText = reader.ReadToEnd();
            }

            if (context.Connection.State != ConnectionState.Open)
            {
                context.Connection.Open();
            }

            command.ExecuteNonQuery();
            context.Commit();

            // context.Connection.Close();
        }

        private static void SeedCompanies(IDataContext context)
        {
            context.Companies.AddOrUpdate(new Company { Id = 1, CompanyName = "Test company" });
        }

        private static void SeedGroups(IDataContext context)
        {
            context.Groups.AddOrUpdate(new Group { Id = 1, Name = "Test Group" });
            context.Commit();
        }

        private static void SeedPermissions(IDataContext context)
        {
            context.Permissions.AddOrUpdate(new Permission { Id = Permission.CanManagePermissions, Code = "ManagePermissions", Name = "Can manage permissions" });
            context.Permissions.AddOrUpdate(new Permission { Id = Permission.CanManageRoles, Code = "ManageRoles", Name = "Can manage roles" });
            context.Permissions.AddOrUpdate(new Permission { Id = Permission.CanManageGroups, Code = "ManageGroups", Name = "Can manage groups" });
            context.Permissions.AddOrUpdate(new Permission { Id = Permission.CanManageUsers, Code = "ManageUsers", Name = "Can manage users" });
            context.Permissions.AddOrUpdate(new Permission { Id = Permission.CanManageMenu, Code = "ManageMenu", Name = "Can manage menu" });
            context.Permissions.AddOrUpdate(new Permission { Id = Permission.CanManageCompanies, Code = "ManageCompanies", Name = "Can manage companies" });
            context.Permissions.AddOrUpdate(new Permission { Id = Permission.CanManageTemplates, Code = "ManageTemplates", Name = "Can manage templates" });
            context.Permissions.AddOrUpdate(new Permission { Id = Permission.CompanyAdmin, Code = "CompanyAdmin", Name = "Company Administrator", IsParameterised = true, ParameterName = "Company", SQL = "select Id, CompanyName from Company order by CompanyName" });
            context.Commit();
        }
       
        private static void SeedRoles(IDataContext context)
        {
            context.Roles.AddOrUpdate(new Role { Id = 1, Name = "Demo Role" });
            context.Roles.AddOrUpdate(new Role { Id = 2, Name = "Test Role" });
            context.Commit();
        }

        private static void SeedUsers(IDataContext context)
        {
            var role = context.Roles.Find(1);

            if (!context.Users.Any(u => u.Name == "nasa_science@hotmail.com"))
            {
                var admin = new User
                {
                    Name = "nasa_science@hotmail.com",
                    FirstName = "nasa_science@hotmail.com",
                    Surname = "nasa_science@hotmail.com",
                    IsAdmin = true,
                    Roles = new List<Role> { role },
                    UserSettings = new UserSettings { Language = context.Languages.First() },
                };

                context.Users.Add(admin);
                context.Commit();

                WebSecurity.CreateAccount(admin.Name, "prognasa");
            }

            if (!context.Users.Any(u => u.Name == "jjsanchez717@outlook.com"))
            {
                var admin = new User
                {
                    Name = "jjsanchez717@outlook.com",
                    FirstName = "jjsanchez717@outlook.com",
                    Surname = "jjsanchez717@outlook.com",
                    IsAdmin = true,
                    Roles = new List<Role> { role },
                    UserSettings = new UserSettings { Language = context.Languages.First() },
                };

                context.Users.Add(admin);
                context.Commit();

                WebSecurity.CreateAccount(admin.Name, "chavezteama");
            }

            if (!context.Users.Any(u => u.Name == "demo@bbconsult.co.uk"))
            {
                var demo = new User
                {
                    Name = "demo@bbconsult.co.uk",
                    FirstName = "demo",
                    Surname = "demo",
                    IsAdmin = false,
                    Roles = new List<Role> { role },
                    UserSettings = new UserSettings { Language = context.Languages.ToList().Skip(1).First() },
                };

                context.Users.Add(demo);
                context.Commit();

                WebSecurity.CreateAccount(demo.Name, demo.Name);
            }

            if (!context.Users.Any(u => u.Name == "manager@bbconsult.co.uk"))
            {
                var manager = new User
                                  {
                                      Name = "manager@bbconsult.co.uk",
                                      FirstName = "manager",
                                      Surname = "manager",
                                      IsAdmin = false,
                                      Roles = new List<Role> { role },
                                      UserSettings = new UserSettings { Language = context.Languages.ToList().Skip(2).First() },
                                      Permissions =
                                          new List<AssignedPermission>
                                              {
                                                  new AssignedPermission
                                                      {
                                                          LinkedPermission
                                                              =
                                                              context
                                                              .Permissions
                                                              .Find(
                                                                  Permission
                                                              .CompanyAdmin),
                                                          ParameterValue
                                                              = "1"
                                                      }
                                              }
                                  };

                context.Users.Add(manager);

                var company = context.Companies.Find(1);
                if (company.Users == null)
                {
                    company.Users = new List<User>();
                }

                company.Users.Add(manager);

                context.Commit();

                WebSecurity.CreateAccount(manager.Name, manager.Name);
            }
        }

        private static void SeedProducts(IDataContext context)
        {
            
            if (!context.Products.Any())
            {
                //context.Products.Add(new Product { Title = "Idle", Price = 1, Purchased = 0, Category = "Boxing", Type = "Anim", UploadedDate = null, File = "Boxing_Idle.gif", Downloads = 0 });
                context.Products.AddOrUpdate(new Product { Title = "Idle", Price = 1, Purchased = 0, Category = "Boxing", Type = "Anim", UploadedDate = null, File = "Boxing_Idle.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Attack01", Price = 1, Purchased = 0, Category = "Boxing", Type = "Anim", UploadedDate = null, File = "Boxing_Attack01.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Attack02", Price = 1, Purchased = 0, Category = "Boxing", Type = "Anim", UploadedDate = null, File = "Boxing_Attack02.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Attack03", Price = 1, Purchased = 0, Category = "Boxing", Type = "Anim", UploadedDate = null, File = "Boxing_Attack03.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Block01", Price = 1, Purchased = 0, Category = "Boxing", Type = "Anim", UploadedDate = null, File = "Boxing_Block01.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Block02", Price = 1, Purchased = 0, Category = "Boxing", Type = "Anim", UploadedDate = null, File = "Boxing_Block02.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "LookingAround", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "Idle_LookingAround.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Bored", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "Bored.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Boxing", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "Boxing.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Dance", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "Dance.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Dance 2", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "Dance2.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Drunk", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "Drunk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Fighting", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "Fighting.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Hand on waist", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "handonwaist.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Man Natural", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "Man_Natural.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Woman Natural", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "Woman_Natural.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Sexy", Price = 1, Purchased = 0, Category = "Idle", Type = "Anim", UploadedDate = null, File = "Sexy.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Complaining", Price = 1, Purchased = 0, Category = "Strike", Type = "Anim", UploadedDate = null, File = "Strike_Complaining.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Rap 01", Price = 1, Purchased = 0, Category = "Dance", Type = "Anim", UploadedDate = null, File = "Rap01.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Rap 02", Price = 1, Purchased = 0, Category = "Dance", Type = "Anim", UploadedDate = null, File = "Rap02.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Singing", Price = 1, Purchased = 0, Category = "Dance", Type = "Anim", UploadedDate = null, File = "Singing.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Rock and Roll", Price = 1, Purchased = 0, Category = "Dance", Type = "Anim", UploadedDate = null, File = "RockAndRoll.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });

                //MOOD
                context.Products.AddOrUpdate(new Product { Title = "Afraid", Price = 1, Purchased = 0, Category = "Mood", Type = "Anim", UploadedDate = null, File = "Afraid.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Cheering", Price = 1, Purchased = 0, Category = "Mood", Type = "Anim", UploadedDate = null, File = "Cheering.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Dejected", Price = 1, Purchased = 0, Category = "Mood", Type = "Anim", UploadedDate = null, File = "Dejected.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Depressed", Price = 1, Purchased = 0, Category = "Mood", Type = "Anim", UploadedDate = null, File = "Depressed.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Man Angry", Price = 1, Purchased = 0, Category = "Mood", Type = "Anim", UploadedDate = null, File = "Man_Angry.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Man Surprised", Price = 1, Purchased = 0, Category = "Mood", Type = "Anim", UploadedDate = null, File = "Man_Surprised.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Woman Angry", Price = 1, Purchased = 0, Category = "Mood", Type = "Anim", UploadedDate = null, File = "Woman_Angry.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Woman Laughing", Price = 1, Purchased = 0, Category = "Mood", Type = "Anim", UploadedDate = null, File = "Woman_Laughing.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Woman Surprised", Price = 1, Purchased = 0, Category = "Mood", Type = "Anim", UploadedDate = null, File = "Woman_Surprised.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });

                //MOVE
                context.Products.AddOrUpdate(new Product { Title = "Angry Walk", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "Angry_Walk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Basic Run", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "Basic_Run.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Basic Walk", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "Basic_Walk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Cool Walk", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "Cool_Walk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Depressed Walk", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "Depressed_Walk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Rude Walk", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "Rude_Walk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Strut Walk", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "Strut_Walk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "TipToe Walk", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "TipToe_Walk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Woman Basic Walk", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "Woman_Basic_Walk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Woman Cute Walk", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "Woman_Cute_Walk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Woman Run", Price = 1, Purchased = 0, Category = "Move", Type = "Anim", UploadedDate = null, File = "Woman_Run.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });

                //TALK
                context.Products.AddOrUpdate(new Product { Title = "Arguing", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Arguing.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Explain 1", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Explain1.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Explain 2", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Explain2.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Explain 3", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Explain3.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Ignore", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Ignore.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Refuse", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Refuse.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Talk", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Talk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Taunt", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Taunt.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Unconcerned", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Unconcerned.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Woman Arguing", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Woman_Arguing.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Woman Talk", Price = 1, Purchased = 0, Category = "Talk", Type = "Anim", UploadedDate = null, File = "Woman_Talk.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                

                //CHARACTERS
                //MASCULINE
                context.Products.AddOrUpdate(new Product { Title = "Civil 1", Price = 0.5f, Purchased = 0, Category = "Masculine", Type = "Char", UploadedDate = null, File = "civil1.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Civil 2", Price = 0.5f, Purchased = 0, Category = "Masculine", Type = "Char", UploadedDate = null, File = "civil2.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Civil 3", Price = 0.5f, Purchased = 0, Category = "Masculine", Type = "Char", UploadedDate = null, File = "civil3.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Civil 4", Price = 0.5f, Purchased = 0, Category = "Masculine", Type = "Char", UploadedDate = null, File = "Civil4.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Civil 5", Price = 0.5f, Purchased = 0, Category = "Masculine", Type = "Char", UploadedDate = null, File = "striker.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Civil 6", Price = 0.5f, Purchased = 0, Category = "Masculine", Type = "Char", UploadedDate = null, File = "striker2.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                //FEMININE
                context.Products.AddOrUpdate(new Product { Title = "Civil Girl 1", Price = 0.5f, Purchased = 0, Category = "Feminine", Type = "Char", UploadedDate = null, File = "CivilGirl1.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Civil Girl 2", Price = 0.5f, Purchased = 0, Category = "Feminine", Type = "Char", UploadedDate = null, File = "civilgirl2.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Civil Girl 3", Price = 0.5f, Purchased = 0, Category = "Feminine", Type = "Char", UploadedDate = null, File = "civilgirl3.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                context.Products.AddOrUpdate(new Product { Title = "Civil Girl 4", Price = 0.5f, Purchased = 0, Category = "Feminine", Type = "Char", UploadedDate = null, File = "CivilGirl4.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                //ZOMBIE
                //context.Products.AddOrUpdate(new Product { Title = "Zombie", Price = 0.5f, Purchased = 0, Category = "Feminine", Type = "Char", UploadedDate = null, File = "CivilGirl1.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
               // context.Products.AddOrUpdate(new Product { Title = "Civil Girl 2", Price = 0.5f, Purchased = 0, Category = "Feminine", Type = "Char", UploadedDate = null, File = "civilgirl2.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                //SOLDIER
               // context.Products.AddOrUpdate(new Product { Title = "Civil Girl 3", Price = 0.5f, Purchased = 0, Category = "Feminine", Type = "Char", UploadedDate = null, File = "civilgirl3.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
               // context.Products.AddOrUpdate(new Product { Title = "Civil Girl 4", Price = 0.5f, Purchased = 0, Category = "Feminine", Type = "Char", UploadedDate = null, File = "CivilGirl4.PNG", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
               /* for (int i = 0; i < 30; i++)
                {
                    context.Products.AddOrUpdate(new Product { Title = string.Format("Item_{0:D4}", i), Price = 1, Purchased = 0, Category = "Other", Type = "Anim", UploadedDate = null, File = "Boxing_Block01.gif", Downloads = 0, FakeDownloads = new Random().Next(7,17) });
                }*/

                context.Commit();
            }

           /* if (context.TestProducts.Count() < 100)
            {
                var rand = new Random();
                for (int i = 0; i < 500; i++)
                {
                    context.TestProducts.Add(new TestProduct { Name = string.Format("test_{0:D4}", i), Price = rand.Next(1, 1000) });
                    context.TestProducts.Add(new TestProduct { Name = string.Format("foo_{0:D4}", i), Price = rand.Next(1, 1000) });
                    context.TestProducts.Add(new TestProduct { Name = string.Format("bar_{0:D4}", i), Price = rand.Next(1, 1000) });
                    context.TestProducts.Add(new TestProduct { Name = string.Format("prd_{0:D4}", i), Price = rand.Next(1, 1000) });
                    context.TestProducts.Add(new TestProduct { Name = string.Format("abc_{0:D4}", i), Price = rand.Next(1, 1000) });

                    if (i % 10 == 0)
                    {
                        context.Commit();
                    }
                }

                context.Commit();
            }*/
        }

        private static void SeedCommonEmailParameters(IDataContext context)
        {
            if (!context.TemplateParameters.Any(p => p.Title == "$AppName"))
            {
                context.TemplateParameters.Add(
                    new TemplateParameter { Title = "$AppName", Notes = "The application name" });
                context.Commit();
            }

            if (!context.TemplateParameters.Any(p => p.Title == "$DateTime"))
            {
                context.TemplateParameters.Add(new TemplateParameter
                {
                    Title = "$DateTime",
                    Notes = "The current date & time"
                });
                context.Commit();
            }

            if (!context.TemplateParameters.Any(p => p.Title == "$UserName"))
            {
                context.TemplateParameters.Add(new TemplateParameter
                {
                    Title = "$UserName",
                    Notes = "The current user name"
                });
                context.Commit();
            }

            if (!context.TemplateParameters.Any(p => p.Title == "$UserFirstName"))
            {
                context.TemplateParameters.Add(new TemplateParameter
                {
                    Title = "$UserFirstName",
                    Notes = "The current user first name"
                });
                context.Commit();
            }

            if (!context.TemplateParameters.Any(p => p.Title == "$UserSurname"))
            {
                context.TemplateParameters.Add(new TemplateParameter
                {
                    Title = "$UserSurname",
                    Notes = "The current user surname"
                });
                context.Commit();
            }

            if (!context.TemplateParameters.Any(p => p.Title == "$UserEmail"))
            {
                context.TemplateParameters.Add(new TemplateParameter
                {
                    Title = "$UserEmail",
                    Notes = "The current user email address"
                });
                context.Commit();
            }
        }

        private static void SeedEmailTemplates(IDataContext context)
        {
            EmailTemplate template;

            if (!context.EmailTemplates.Any(t => t.Code == "ProblemNotification"))
            {
                template = new EmailTemplate
                               {
                                   Code = "ProblemNotification",
                                   Title = "Report a Problem",
                                   IsSystem = true,
                                   From = Notifications.ProblemNotificationFrom,
                                   Subject = Notifications.ProblemNotificationSubject,
                                   Message = Notifications.ProblemNotificationMessage,
                                   Notes = Notifications.ProblemNotificationNotes,
                                   Parameters = new List<TemplateParameter>()
                               };

                context.EmailTemplates.AddOrUpdate(template);
                context.Commit();

                context.TemplateParameters.AddOrUpdate(new TemplateParameter { Title = "ProblemDateTime", Notes = "The problem date & time", Template = template });
                context.TemplateParameters.AddOrUpdate(new TemplateParameter { Title = "ProblemUserName", Notes = "The problem user name", Template = template });
                context.TemplateParameters.AddOrUpdate(new TemplateParameter { Title = "ProblemUserEmail", Notes = "The problem user email address", Template = template });
                context.Commit();
            }

            if (!context.EmailTemplates.Any(t => t.Code == "UserCreated"))
            {
                template = new EmailTemplate
                               {
                                   Code = "UserCreated",
                                   Title = "User Created",
                                   IsSystem = true,
                                   From = Notifications.NewUserNotificationFrom,
                                   Subject = Notifications.NewUserNotificationSubject,
                                   Message = Notifications.NewUserNotificationMessage,
                                   Notes = Notifications.NewUserNotificationNotes,
                                   Parameters = new List<TemplateParameter>()
                               };

                context.EmailTemplates.AddOrUpdate(template);

                context.Commit();
            }

            if (!context.EmailTemplates.Any(t => t.Code == "ResetPassword"))
            {
                template = new EmailTemplate
                {
                    Code = "ResetPassword",
                    Title = "Reset Password",
                    IsSystem = true,
                    From = Notifications.NewUserNotificationFrom,
                    Subject = Notifications.ResetPasswordNotificationSubject,
                    Message = Notifications.ResetPasswordNotificationMessage,
                    Notes = Notifications.NewUserNotificationNotes,
                    Parameters = new List<TemplateParameter>()
                };

                context.EmailTemplates.AddOrUpdate(template);

                context.Commit();
            }

            if (!context.EmailTemplates.Any(t => t.Code == "ResetPasswordByAdmin"))
            {
                template = new EmailTemplate
                {
                    Code = "ResetPasswordByAdmin",
                    Title = "Reset Password",
                    IsSystem = true,
                    From = Notifications.NewUserNotificationFrom,
                    Subject = Notifications.ResetPasswordNotificationSubject,
                    Message = Notifications.ResetPasswordByAdminNotificationMessage, // TODO: check if the content of the template is correct, I'm not sure.
                    Notes = Notifications.NewUserNotificationNotes,
                    Parameters = new List<TemplateParameter>()
                };

                context.EmailTemplates.AddOrUpdate(template);

                context.Commit();
            }
        }
    }
}
