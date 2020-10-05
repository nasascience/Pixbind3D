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
    /// The EmailTemplateMap class
    /// </summary>
    public class EmailTemplateMap : EntityTypeConfiguration<EmailTemplate>
    {
        /// <summary>
        /// EmailTemplateMap constructor
        /// </summary>
        public EmailTemplateMap()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("Id");

            this.Property(t => t.Code)
                .HasColumnName("Code")
                .HasMaxLength(32)
                .IsRequired();

            this.Property(t => t.Title)
                .HasColumnName("Title")
                .HasMaxLength(64)
                .IsRequired();

            this.Property(t => t.IsSystem)
                .HasColumnName("IsSystem")
                .IsRequired();

            this.Property(t => t.From)
                .HasColumnName("From")
                .HasMaxLength(256)
                .IsRequired();

            this.Property(t => t.Subject)
                .HasColumnName("Subject")
                .HasMaxLength(256)
                .IsRequired();

            this.Property(t => t.Message)
                .HasColumnName("Message")
                .IsOptional();

            this.Property(t => t.Notes)
                .HasColumnName("Notes")
                .IsOptional();

            this.HasMany(t => t.Parameters)
                .WithOptional(p => p.Template);

            this.ToTable("EmailTemplates");
        }
    }
}
