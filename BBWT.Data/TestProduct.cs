namespace BBWT.Data
{
    /// <summary>
    /// Test product entity
    /// </summary>
    public class TestProduct : Entity
    {
        /// <summary>
        /// Name of product
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Price of product
        /// </summary>
        public decimal Price { get; set; }
    }
}