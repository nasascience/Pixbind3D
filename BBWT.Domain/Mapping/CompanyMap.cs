namespace BBWT.Domain.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;

    using BBWT.Data.Membership;

    /// <summary>
    /// <see cref="Company"/> mapping configuration
    /// </summary>
    public class CompanyMap : EntityTypeConfiguration<Company>
    {
        /// <summary>
        /// Construct <see cref="CompanyMap"/> class
        /// </summary>
        public CompanyMap()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("Id");

            this.Property(t => t.CompanyName).HasColumnName("CompanyName").IsRequired().HasMaxLength(256);
            this.Property(t => t.MainContactName).HasColumnName("MainContactName").HasMaxLength(256);
            this.Property(t => t.MainContactAddress).HasColumnName("MainContactAddress");
            this.Property(t => t.MainContactPhoneNumber).HasColumnName("MainContactPhoneNumber").HasMaxLength(256);
            this.Property(t => t.MainContactMobileNumber).HasColumnName("MainContactMobileNumber").HasMaxLength(256);
            this.Property(t => t.MainContactEmail).HasColumnName("MainContactEmail").HasMaxLength(256);
            this.Property(t => t.MainContactPostcode).HasColumnName("MainContactPostcode").HasMaxLength(256);
            this.Property(t => t.BillingContactName).HasColumnName("BillingContactName").HasMaxLength(256);
            this.Property(t => t.BillingContactAddress).HasColumnName("BillingContactAddress");
            this.Property(t => t.BillingContactPhoneNumber).HasColumnName("BillingContactPhoneNumber").HasMaxLength(256);
            this.Property(t => t.BillingContactMobileNumber).HasColumnName("BillingContactMobileNumber").HasMaxLength(256);
            this.Property(t => t.BillingContactEmail).HasColumnName("BillingContactEmail").HasMaxLength(256);
            this.Property(t => t.BillingContactPostcode).HasColumnName("BillingContactPostcode").HasMaxLength(256);
            this.Property(t => t.Comment).HasColumnName("Comment");

            this.HasMany(t => t.Users)
                .WithMany()
                .Map(m =>
                {
                    m.ToTable("CompanyUsers");
                    m.MapLeftKey("CompanyId");
                    m.MapRightKey("UserId");
                });

            this.HasMany(t => t.Groups)
                .WithMany()
                .Map(m =>
                {
                    m.ToTable("CompanyGroups");
                    m.MapLeftKey("CompanyId");
                    m.MapRightKey("GroupId");
                });

            this.ToTable("Company");
        }
    }
}
