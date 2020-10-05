namespace BBWT.Domain.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;

    using BBWT.Data.Membership;

    /// <summary>
    /// <see cref="Role"/> class mapping configuration
    /// </summary>
    public class RoleMap : EntityTypeConfiguration<Role>
    {
        /// <summary>
        /// Constructs RoleMap class
        /// </summary>
        public RoleMap()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("RoleId");

            this.Property(t => t.Name).HasColumnName("Name").IsRequired();

            this.ToTable("webpages_Roles");
        }
    }
}
