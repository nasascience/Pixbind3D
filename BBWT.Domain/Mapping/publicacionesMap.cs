namespace BBWT.Domain.Mapping
{
    using System.Data.Entity.ModelConfiguration;
    using BBWT.Data.DAD;
        /// <summary>
    /// publicaciones map
    /// </summary>
    public class publicacionesMap: EntityTypeConfiguration<Publicacion>
    {
        public publicacionesMap()
        {
            this.HasKey(t => t.Id);

            this.ToTable("Publicaciones");
        }
    }
}
