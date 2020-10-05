namespace BBWT.Domain.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;

    using BBWT.Data.Dictionary;
    using BBWT.Data.Membership;

    /////// <summary>
    /////// <see cref="Group"/> mapping configuration
    /////// </summary>
    //// public class BasicDictionaryMap : EntityTypeConfiguration<BasicDictionary>
    //// {
    ////    /// <summary>
    ////    /// Constructs <see cref="GroupMap"/> class
    ////    /// </summary>
    ////    public BasicDictionaryMap()
    ////    {
    ////        this.HasKey(t => t.Id);

    ////        this.Property(t => t.Id)
    ////            .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None)
    ////            .HasColumnName("Id");

    ////        this.Property(t => t.Name).HasColumnName("Name").IsRequired().HasMaxLength(150);

    ////        this.ToTable("Dictionary");
    ////    }
    ////}
}
