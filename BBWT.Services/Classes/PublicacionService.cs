namespace BBWT.Services.Classes
{
    using System;
    using System.Linq;

    using BBWT.Data.DAD;
    using BBWT.Domain;
    using BBWT.Services.Interfaces;
    public class PublicacionService : IPublicacionService
    {
        private readonly IDataContext context;
        /// <summary>
        /// Constructs demo service instance
        /// </summary>
        /// <param name="ctx">data context</param>
        public PublicacionService(IDataContext ctx)
        {
            this.context = ctx;
        }

        /// <summary>
        /// Get list of all Publicacion
        /// </summary>
        /// <returns>Publicacion</returns>
        public IQueryable<Publicacion> GetAllPublicacion()
        {
            return this.context.Publicaciones;
        }

        /// <summary>
        /// Get Publicacion by id
        /// </summary>
        /// <param name="id">Publicacion id</param>
        /// <returns>Publicacion</returns>
        public Publicacion GetPublicacionById(int id)
        {
            return this.context.Publicaciones.Find(id);
        }

        /// <summary>
        /// Create Publicacion
        /// </summary>
        /// <param name="Publicacion">Publicacion</param>
        public void CreatePublicacion(Publicacion publicacion)
        {
            this.context.Publicaciones.Add(publicacion);
            this.context.Commit();
        }

        /// <summary>
        /// Update Publicacion
        /// </summary>
        /// <param name="id">Publicacion ID</param>
        /// <param name="uvc">Update strategy</param>
        public void UpdatePublicacion(int id, Action<Publicacion> pb)
        {
            var db = this.context.Publicaciones.FirstOrDefault(p => p.Id == id);
            if (db != null)
            {
                pb(db);
                this.context.Commit();
            }
        }
    }
}
