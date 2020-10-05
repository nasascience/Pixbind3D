namespace BBWT.Domain.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;

    using BBWT.Data;

    /// <summary>
    /// Mapping for <see cref="TestProduct"/> class
    /// </summary>
    public class TestProductMap : EntityTypeConfiguration<TestProduct>
    {
        /// <summary>
        /// Constructs new instance of <see cref="TestProductMap"/>
        /// </summary>
        public TestProductMap()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("Id");

            this.Property(t => t.Name).HasColumnName("Name").IsRequired().HasMaxLength(150);
            this.Property(t => t.Price).HasColumnName("Price");

            this.ToTable("TestProducts");
        }
    }
}
