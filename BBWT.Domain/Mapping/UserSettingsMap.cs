namespace BBWT.Domain.Mapping
{
    using System.Data.Entity.ModelConfiguration;
    using BBWT.Data.Membership;

    /// <summary>
    /// User settings map
    /// </summary>
    public class UserSettingsMap : EntityTypeConfiguration<UserSettings>
    {
        /// <summary>
        /// Constructs UserSettingsMap instance
        /// </summary>
        public UserSettingsMap()
        {
            this.HasKey(t => t.Id);

            this.HasRequired(p => p.Language)
                .WithMany()
                .HasForeignKey(x => x.LanguageId)
                .WillCascadeOnDelete(true);

            this.HasRequired(x => x.User)
                .WithRequiredDependent(x => x.UserSettings)
                .WillCascadeOnDelete(true);

            this.ToTable("UserSettings");
        }
    }
}