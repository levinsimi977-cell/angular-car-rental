using BL.ClassesDTO;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.FunctionBL
{
    public class CustomerBL
    {

        DBConnection conn = new DBConnection();

        //פונקציית הצגה:
public List<CustomersDTO> GetAllClients()
        {
            DBConnection dbCon = new DBConnection(); ;
            List<Customers> listOfClients = dbCon.GetDbSet<Customers>().ToList();
            return Convert(listOfClients);
        }
        //פונקציית הוספה:
        public string InsertClient(CustomersDTO clients)
        {
            DBConnection dbCon = new DBConnection();
            try
            {
                dbCon.Execute<Customers>(Convert(clients), DBConnection.ExecuteActions.Insert);
                return clients.firstName;

            }
            catch (Exception ex)
            {
                return "error";
            }
        }
        //פונקציית עדכון:
public int UpDateClient(CustomersDTO client)
        {
            DBConnection dbCon = new DBConnection();
            try
            {
                dbCon.Execute<Customers>(Convert(client), DBConnection.ExecuteActions.Update);
                return 1;
            }
            catch
            {
                return 0;
            }
        }
        //פונקציית מחיקה:
public int DeleteClient(CustomersDTO client)
        {
            DBConnection dbCon = new DBConnection();
            try
            {
                dbCon.Execute<Customers>(Convert(client), DBConnection.ExecuteActions.Delete);
            return 1;
            }
            catch
            {
                return 0;
            }
        }






        //קבלת רשימת לקוחות ממויינת
        public List<CustomersDTO> GetCustomersOrderByName()
        {
            return Convert(conn.GetDbSet<Customers>().ToList()).OrderBy(c => c.firstName).ToList();
        }
        public CustomersDTO Customerbyid(int id)
        {
            var customer = conn.GetDbSet<Customers>().FirstOrDefault(x => x.Id == id);

            if (customer == null)
            {
                // אם הלקוח לא נמצא, החזר -1
                return null;  // או החזר CustomersDTO עם ערכים דיפולטיים
            }

            return Convert(customer);
        }
        public List<CustomersDTO> GetThreeV()
        {
            return Convert(conn.GetDbSet<Customers>().OrderBy(c => c.numRents).Take(3).ToList());
        }
        public List<CustomersDTO> GetFromCity(int city)
        {
            return Convert(conn.GetDbSet<Customers>().Where(c => c.codeCity == city).ToList());
        }
        public PaymentDTO GetDeatailsPayments(int id)
        {
            PaymentBL pbl = new PaymentBL();
            CustomersDTO index = Convert(conn.GetDbSet<Customers>().FirstOrDefault(x => x.Id == id));
            return pbl.Convert(conn.GetDbSet<Payments>().FirstOrDefault(z => z.code == index.codePayment));
        }




        public CustomersDTO Convert(Customers c2)
        {
            DBConnection dbCon = new DBConnection();
            PaymentBL pbl = new PaymentBL();
            CitiesBL cbl = new CitiesBL();
            CustomersDTO c1 = new CustomersDTO();
            c1.Id = c2.Id;
            c1.email = c2.email;
            c1.firstName = c2.firstName;
            c1.lastName = c2.lastName;
            c1.codeCity = c2.codeCity;
            c1.address = c2.address;
            c1.codeCity = c2.codeCity;
            c1.codePayment = c2.codePayment;
            c1.numRents = c2.numRents;
            c1.Payments = pbl.Convert(dbCon.GetDbSet<Payments>().ToList().FirstOrDefault(cc =>
            cc.code == c2.codePayment));
            c1.Cities = cbl.Convert(dbCon.GetDbSet<Cities>().ToList().FirstOrDefault(cc =>
            cc.code == c2.codeCity));
            return c1;
        }
        public Customers Convert(CustomersDTO c2)
        {
            DBConnection dbCon = new DBConnection();
            Customers c1 = new Customers();
            c1.Id = c2.Id;
            c1.email = c2.email;
            c1.firstName = c2.firstName;
            c1.lastName = c2.lastName;
            c1.codeCity = c2.codeCity;
            c1.address = c2.address;
            c1.codeCity = c2.codeCity;
            c1.numRents = c2.numRents;
            c1.codePayment = c2.codePayment;
            c1.Payments = null;
            c1.Cities = null;
            return c1;
        }
        public List<CustomersDTO> Convert(List<Customers> c1)
        {
            List<CustomersDTO> list = new List<CustomersDTO>();
            foreach (Customers c in c1)
            {
                list.Add(Convert(c));
            }
            return list;
        }
        public List<Customers> Convert(List<CustomersDTO> cs)
        {
            List<Customers> list = new List<Customers>();
            foreach (CustomersDTO c in cs)
            {
                list.Add(Convert(c));
            }
            return list;
        }



    }
}
