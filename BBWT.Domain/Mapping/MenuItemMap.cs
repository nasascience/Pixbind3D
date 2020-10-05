namespace BBWT.Domain.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;

    using BBWT.Data.Menu;

    /// <summary>
    /// Mapping configuration
    /// </summary>
    public class MenuItemMap : EntityTypeConfiguration<MenuItem>
    {
        /// <summary>
        /// Constructs MenuItemMap class
        /// </summary>
        public MenuItemMap()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None)
                .HasColumnName("Id");

            this.Property(t => t.Name).HasColumnName("Name").IsRequired();
            this.Property(t => t.Url).HasColumnName("URL").IsOptional();
            this.Property(t => t.ParentId).HasColumnName("ParentId").IsRequired();
            this.Property(t => t.Order).HasColumnName("Order").IsRequired();

            this.ToTable("MenuItems");
        }
    }
}
