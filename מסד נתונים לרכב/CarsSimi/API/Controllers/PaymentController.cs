using BL.FunctionBL;
using BL.ClassesDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace API.Controllers
{
    public class PaymentController
    {
        PaymentBL cbl = new PaymentBL();

        [AcceptVerbs("Get", "Post", "Delete", "Put")]
        [Route("cars")]
        [HttpGet]
        public List<PaymentDTO> GetAllPayment()
        {
            return cbl.GetAllPayment();
        }
        public string InsertPayment(PaymentDTO payment)
        {
           return cbl.InsertPayment(payment);
        }
        public int UpDatePayment(PaymentDTO payment)
        {
            return cbl.UpDatePayment(payment);
        }
        public int DeletePayment(PaymentDTO payments)
        {
            return cbl.DeletePayment(payments);
        }





    }
}