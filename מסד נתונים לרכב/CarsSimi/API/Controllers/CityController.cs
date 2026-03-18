using BL.ClassesDTO;
using BL.FunctionBL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;


namespace API.Controllers
{
    public class CityController
    {
        CitiesBL cbl = new CitiesBL();
        [AcceptVerbs("Get", "Post", "Delete", "Put")]
        [Route("cities")]

        [HttpGet]

        public List<CitiesDTO> GetAllCities()
        {
            return cbl.GetAllCities();
        }
        public string InsertCities(CitiesDTO cities)
        {
            return cbl.InsertCities(cities);
        }
        public int UpDateCities(CitiesDTO cities)
        {
            return cbl.UpDateCities(cities);
        }
        public int DeleteCities(CitiesDTO cities)
        {
            return cbl.DeleteCities(cities);
        }






    }
}