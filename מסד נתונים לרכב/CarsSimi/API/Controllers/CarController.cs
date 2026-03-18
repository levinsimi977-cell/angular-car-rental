using BL.ClassesDTO;
using BL.FunctionBL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace API.Controllers
{

    [RoutePrefix("api/car")]
    public class CarController : ApiController
    {
        CarsBL cbl = new CarsBL();

        [AcceptVerbs("Get", "Post", "Delete", "Put")]

        [Route("getallcars")]
        [HttpGet]

        public List<CarsDTO> GetAllCars()
        {
            return cbl.GetAllCars();
        }

        public IHttpActionResult Options()
        {
            return Ok();
        }
      
        [HttpPost]
        [Route("insertcar")]

        public IHttpActionResult InsertCar([FromBody] CarsDTO car)
        {

            if (car == null) return BadRequest("Data is null");
            try
            {
                var result = cbl.InsertCar(car);

                return Ok(result); // מחזיר 200 OK עם ההודעה מה-BL
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        [Route("updatecar/{id}")]

        [HttpPut]
        public int UpDateCar(CarsDTO cars)
        {
            return cbl.UpDateCar(cars);
        }
        [Route("deletecar/{id}")]

        [HttpDelete]

        public int DeleteCar(CarsDTO cars)
        {
            return cbl.DeleteCar(cars);
        }
        [Route("getcarsbyseats")]

        [HttpGet]

        public List<CarsDTO> GetCarsBySeats(int numseats)
        {
            return cbl.GetCarsBySeats(numseats);
        }
        [Route("getcarsbylevel")]

        [HttpGet]
        public List<CarsDTO> GetCarsByLevel(int level)
        {
            return cbl.GetCarsByLevel(level);
        }
        [Route("getcarsbypriceforDay")]

        [HttpGet]
        public List<CarsDTO> GetCarsByPriceForDay(int price)
        {
            return cbl.GetCarsByPriceForDay(price);
        }
        [Route("getcarsbyallcriterions")]

        [HttpGet]
        public List<CarsDTO> GetCarsByAllCriterions(int level, int price, int numseats)
        {
            return cbl.GetCarsByAllCriterions(level, price, numseats);
        }
    }
}