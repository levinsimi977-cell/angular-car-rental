using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // הגדרה רחבה יותר כדי לוודא ששום Header לא נחסם
            var cors = new EnableCorsAttribute("http://localhost:4200", "*", "*");
            config.EnableCors(cors);

            // שאר ההגדרות כפי שהיו...
            config.MapHttpAttributeRoutes();

            // וודאי שהשורות האלו קיימות כדי להחזיר JSON תקין לאנגולר
            var formatter = config.Formatters.JsonFormatter;
            formatter.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
        }
    
    }
}
