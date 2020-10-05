namespace BBWT.Domain.Mapping
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    using BBWT.Data.Template;

    /// <summary>
    /// The template parameter map class
    /// </summary>
    public class TemplateParameterMap : EntityTypeConfiguration<TemplateParameter>
    {
        /// <summary>
        /// The template parameter map constructor
        /// </summary>
        public TemplateParameterMap()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("Id");

            this.Property(t => t.Title)
                .HasColumnName("Title")
                .HasMaxLength(64)
                .IsRequired();

            this.Property(t => t.Notes)
                .HasColumnName("Notes")
                .IsOptional();

            this.HasOptional(p => p.Template)
                .WithMany(t => t.Parameters);

            this.ToTable("TemplateParameter");
        }
    }
}
