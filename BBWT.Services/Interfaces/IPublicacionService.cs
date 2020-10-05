namespace BBWT.Services.Interfaces
{
    using System;
    using System.Linq;

    using BBWT.Data.DAD;

    /// <summary>
    /// Publicacion Service interface
    /// </summary>
    public interface IPublicacionService
    {
        /// <summary>
        /// Get all Publicacion
        /// </summary>
        /// <returns>Publicacion list</returns>
        IQueryable<Publicacion> GetAllPublicacion();

        /// <summary>Get Publicacion by id</summary>
        /// <param name="id">Publicacion id</param>
        /// <returns>Publicacion</returns>
        Publicacion GetPublicacionById(int id);

        /// <summary>
        /// Create Publicacion
        /// </summary>
        /// <param name="publicacion">Publicacion to create</param>
        void CreatePublicacion(Publicacion publicacion);

        /// <summary>
        /// update Publicacion
        /// </summary>
        /// <param name="id">Publicacion id</param>
        /// <param name="pb">update strategy</param>
        void UpdatePublicacion(int id, Action<Publicacion> pb);
    }
}
