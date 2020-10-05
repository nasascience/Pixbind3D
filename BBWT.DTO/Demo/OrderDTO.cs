namespace BBWT.DTO.Demo
{
    using System;

    /// <summary>
    /// Customer Order
    /// </summary>
    public class OrderDTO
    {
        /// <summary>
        /// ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Customer ID
        /// </summary>
        public string CustomerCode { get; set; }

        /// <summary>
        /// Customer Company Name
        /// </summary>
        public string CustomerCompanyName { get; set; }

        /// <summary>
        /// Order Date
        /// </summary>
        public DateTime? OrderDate { get; set; }

        /// <summary>
        /// Required Date
        /// </summary>
        public DateTime? RequiredDate { get; set; }

        /// <summary>
        /// Shipped Date
        /// </summary>
        public DateTime? ShippedDate { get; set; }

        /// <summary>
        /// RefCode
        /// </summary>
        public string RefCode { get; set; }

        /// <summary>
        /// Purchase Id
        /// </summary>
        public string OrderNumber { get; set; }

        /// <summary>
        /// Purchase Key
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// Purchase Total
        /// </summary>
        public float Total { get; set; }

        /// <summary>
        /// Invoice Id
        /// </summary>
        public string InvoiceId { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Currency Code
        /// </summary>
        public string CurrencyCode { get; set; }

        /// <summary>
        /// Credit Card Processed
        /// </summary>
        public bool CreditCardProcessed { get; set; }

        /// <summary>
        /// Card Holder Name
        /// </summary>
        public string CardHolderName { get; set; }

        /// <summary>
        /// ClientId
        /// </summary>
        public int ClientId { get; set; }

        /// <summary>
        /// Status
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// Quantity
        /// </summary>
        public int Qty { get; set; }

        /// <summary>
        /// DirectPay
        /// </summary>
        public bool DirectPay { get; set; }
    }
}
