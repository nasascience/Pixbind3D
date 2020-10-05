namespace BBWT.Data
{
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Base class for all entities
    /// </summary>
    public class Entity
    {
        /// <summary>
        /// Entity identity field
        /// </summary>
        [Key]
        public int Id { get; set; }
    }
}
