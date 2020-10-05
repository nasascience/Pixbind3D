namespace BBWT.Data.Demo
{
    /// <summary>
    /// Order Detail
    /// </summary>
    public class OrderDetail : Entity
    {
        /// <summary>
        /// Order product
        /// </summary>
       // public virtual Product Product { get; set; }

        /// <summary>
        /// Quantity
        /// </summary>
        public decimal Quantity { get; set; }

        /// <summary>
        /// Price
        /// </summary>
        public decimal Price { get; set; }
    }
}
