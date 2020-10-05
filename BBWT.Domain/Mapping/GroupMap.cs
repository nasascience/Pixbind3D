namespace BBWT.Domain.Mapping
{
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.ModelConfiguration;

    using BBWT.Data.Membership;

    /// <summary>
    /// <see cref="Group"/> mapping configuration
    /// </summary>
    public class GroupMap : EntityTypeConfiguration<Group>
    {
        /// <summary>
        /// Constructs <see cref="GroupMap"/> class
        /// </summary>
        public GroupMap()
        {
            this.HasKey(t => t.Id);

            this.Property(t => t.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .HasColumnName("Id");

            this.Property(t => t.Name).HasColumnName("Name").IsRequired().HasMaxLength(150);

            this.HasMany(t => t.Roles)
                .WithMany()
                .Map(m =>
                {
                    m.ToTable("GroupsRoles");
                    m.MapLeftKey("GroupId");
                    m.MapRightKey("RoleId");
                });

            this.ToTable("Groups");
        }
    }
}
