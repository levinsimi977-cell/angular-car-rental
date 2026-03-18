using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace BL.ClassesDTO
{
    public class CustomersDTO
    {
        public int Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public int codeCity { get; set; }
        public string email { get; set; }
        public int numRents { get; set; }
        public int codePayment { get; set; }
        public string address { get; set; }

        public virtual CitiesDTO Cities { get; set; }
        public virtual PaymentDTO Payments { get; set; }
    }
}
