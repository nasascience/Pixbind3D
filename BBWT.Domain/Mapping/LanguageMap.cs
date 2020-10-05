namespace BBWT.Domain.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;
    using BBWT.Data.Membership;

    /// <summary>
    /// Language map
    /// </summary>
    public class LanguageMap : EntityTypeConfiguration<Language>
    {
        /// <summary>
        /// Constructs language map instance
        /// </summary>
        public LanguageMap()
        {
            this.HasKey(x => x.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("LanguageId");

            this.Property(x => x.Name).IsRequired();

            this.ToTable("Languages");
        }
    }
}