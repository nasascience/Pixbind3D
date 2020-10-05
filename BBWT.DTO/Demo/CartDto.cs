using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBWT.DTO.Demo
{
    public class CartDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCategory { get; set; }
        public int UserId { get; set; }
        public float? ProductPrice { get; set; }
        public DateTime AddedDate { get; set; }
        public string File { get; set; }
    }
}
