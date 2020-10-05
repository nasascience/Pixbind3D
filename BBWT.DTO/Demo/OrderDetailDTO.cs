namespace BBWT.DTO.Demo
{
    /// <summary>
    /// Order Detail
    /// </summary>
    public class OrderDetailDTO
    {
        /// <summary>
        /// ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Order product title
        /// </summary>
        public string ProductTitle { get; set; }

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
