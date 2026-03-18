using BL.ClassesDTO;
using BL.FunctionBL;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace API.Controllers
{
    [RoutePrefix("api/rent")]
    public class RentController : ApiController
    {
        RentBL cbl = new RentBL();

        [AcceptVerbs("Get", "Post", "Delete", "Put")]
        [Route("rents")]

        [HttpGet]
        [Route("getallrents")]

        public List<RentDTO> GetAllRents()
        {
            return cbl.GetAllRents();
        }
        public IHttpActionResult Options()
        {
            return Ok();
        }
        [HttpPost]
        [Route("insertrent")]
        
        public IHttpActionResult InsertRent([FromBody]RentDTO rent)
        {

            if (rent == null) return BadRequest("Data is null");
            try
            {
                var result = cbl.InsertRent(rent);
                if (result == "error") return InternalServerError(); // עכשיו אנגולר יזהה שזו שגיאה
                return Ok(result);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [HttpPut]

        public int UpDateRent(RentDTO rent)
        {
            return cbl.UpDateRent(rent);
        }

        [HttpDelete]
        public int DeleteRent(RentDTO rent)
        {
            return cbl.DeleteRent(rent);
        }


        [HttpGet] 
        [Route("getrentfromthisweek")]

        public List<RentDTO> GetRentFromThisWeek()
        {
            return cbl.GetRentFromThisWeek();

        }
        [HttpGet]
        [Route("getrentfromlastmounth")]

        public List<RentDTO> GetRentFromLastMounth()
        {
            return cbl.GetRentFromLastMounth();

        }
        [HttpGet]
        [Route("getrentthatstarttoday")]

        public List<RentDTO> GetRentThatStartToday()
        {
            return cbl.GetRentThatStartToday();

        }
        [HttpGet]

        [Route("getrentthatstartondate")]

        public List<RentDTO> GetRentThatStartOnDate([FromBody]DateTime date)
        {
            return cbl.GetRentThatStartOnDate(date);

        }
        [HttpGet]
        [Route("getrentthatendondate")]

        public List<RentDTO> GetRentThatEndOnDate([FromBody] DateTime date)
        {
            return cbl.GetRentThatEndOnDate(date);

        }


        [HttpGet]
        [Route("getrentthatavailablefromtoo")]

        public List<CarsDTO> GetRentThatAvailableFromToo([FromUri] DateTime start, [FromUri] DateTime end)
        {
            return cbl.GetRentThatAvailableFromToo(start, end);
        }
        [HttpGet]

        public List<CarsDTO> GetCarsByGaol(string goal)
        {
            return cbl.GetCarsByGaol(goal);

        }
        [HttpGet]
        [Route("getrentbycustomerid/{id}")]
        public List<RentDTO> GetRentByCustomerid(int id)
        {
            return cbl.GetRentByCustomerid(id);

        }
        [HttpGet]
        [Route("getrentbyid/{id}")]

        public List<RentDTO> GetRentById(int id)
        {
            return cbl.GetRentById(id);

        }
        [HttpGet]
        [Route("getrentorderby")]

        public List<RentDTO> GetRentOrderBy()
        {
            return cbl.GetRentOrderBy();
        }



    }

}
        
