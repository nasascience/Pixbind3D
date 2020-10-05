namespace BBWT.Data.Demo
{
    using System;
    /// <summary>
    /// Product
    /// </summary>
    public class Cart : Entity
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCategory { get; set; }
        public int UserId { get; set; }
        public float? ProductPrice { get; set; }
        public DateTime AddedDate { get; set; }
        public string File { get; set; }
    }
}
