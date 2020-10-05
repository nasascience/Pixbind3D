namespace BBWT.Domain.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;
    using BBWT.Data.Membership;

    /// <summary>
    /// <see cref="User"/> class mapping configuration
    /// </summary>
    public class UserMap : EntityTypeConfiguration<User>
    {
        /// <summary>
        /// Constructs UserMap class
        /// </summary>
        public UserMap()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("UserId");

            this.Property(t => t.Name).HasColumnName("Name").IsRequired();
            this.Property(t => t.FirstName).HasColumnName("FirstName").IsRequired();
            this.Property(t => t.Surname).HasColumnName("Surname").IsRequired();

            this.HasMany(t => t.Groups)
                .WithMany()
                .Map(m =>
                {
                    m.ToTable("UsersGroups");
                    m.MapLeftKey("UserId");
                    m.MapRightKey("GroupId");
                });

            this.HasMany(t => t.Roles)
                .WithMany()
                .Map(m =>
                {
                    m.ToTable("webpages_UsersInRoles");
                    m.MapLeftKey("UserId");
                    m.MapRightKey("RoleId");
                });

            this.ToTable("Users");
        }
    }
}
