using BL.ClassesDTO;
using BL.FunctionBL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API.Controllers
{
    [RoutePrefix("api/customer")]
    public class CustomerController : ApiController
    {
        CustomerBL cbl=new CustomerBL();

        [AcceptVerbs("Get", "Post", "Delete", "Put")]
        [Route("getallclients")]

       
        [HttpGet]

        public List<CustomersDTO> GetAllClients()
        {
            return cbl.GetAllClients();
        }
        [HttpOptions]
        [Route("insertclient")]
        public IHttpActionResult Options()
        {
            return Ok();
        }
        [HttpPost]
        [Route("insertclient")]
        public IHttpActionResult InsertClient([FromBody] CustomersDTO clients)
        {
            if (clients == null) return BadRequest("Data is null");
            try
            {
                var result = cbl.InsertClient(clients);

                return Ok(result); // מחזיר 200 OK עם ההודעה מה-BL
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("UpDateClient/client")]

        [HttpPut]
        public int UpDateClient(CustomersDTO client)
        { return cbl.UpDateClient(client); }

        [HttpDelete]

        public int DeleteClient(CustomersDTO client)
        {
            return cbl.DeleteClient(client);
        }


        [HttpGet]
        public List<CustomersDTO> GetCustomersOrderByName()
        {
            return cbl.GetCustomersOrderByName();
        }
        [Route("GetCostomerByID/{id}")]

        [HttpGet]
        public CustomersDTO GetCostomerByID(int id)
        {

            return cbl.Customerbyid(id);
        }
        [HttpGet]
        public List<CustomersDTO> GetThreeV()
        {
            return cbl.GetThreeV();
        }
        [HttpGet]
        public List<CustomersDTO> GetFromCity(int city)
        {
            return cbl.GetFromCity(city);
        }
        [HttpGet]
        public PaymentDTO GetDeatailsPayments(int id)
        {
            return cbl.GetDeatailsPayments(id);
        }



    }
}