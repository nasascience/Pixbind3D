namespace BBWT.Domain.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;

    using BBWT.Data.Demo;

    /// <summary>
    /// <see cref="Customer"/> mapping configuration
    /// </summary>
    public class CustomerMap : EntityTypeConfiguration<Customer>
    {
        /// <summary>
        /// Constructs <see cref="GroupMap"/> class
        /// </summary>
        public CustomerMap()
        {
            this.HasKey(t => t.Code);

            this.Property(t => t.Code)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None)
                .HasColumnName("Code")
                .IsRequired()
                .HasMaxLength(5);

            this.Property(t => t.CompanyName)
                .HasColumnName("CompanyName")
                .IsRequired()
                .HasMaxLength(50);

            this.ToTable("Customers");
        }
    }
}
