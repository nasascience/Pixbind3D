namespace BBWT.Domain.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;

    using BBWT.Data.Membership;

    /// <summary>
    /// Mapping file for <see cref="Permission"/> entity
    /// </summary>
    public class PermissionMap : EntityTypeConfiguration<Permission>
    {
        /// <summary>
        /// Constructs new instance of <see cref="PermissionMap"/>
        /// </summary>
        public PermissionMap()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None)
                .HasColumnName("Id");

            this.Property(t => t.Code).HasColumnName("Code").IsRequired();

            this.Property(t => t.Name).HasColumnName("PermissionName").IsRequired();

            this.Property(t => t.IsParameterised).HasColumnName("Parameterised").IsRequired();

            this.Property(t => t.ParameterName).HasColumnName("ParameterName").IsOptional();

            this.Property(t => t.SQL).HasColumnName("SQL").IsOptional();

            this.ToTable("Permissions");
        }
    }
}
