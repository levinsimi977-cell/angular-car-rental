import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from './city.service';
import { Payment } from './payment.service';
export interface Customer {
id: number
firstName: string
lastName: string
codeCity: number
email: string
numRents: number
codePayment: number
address: string
City: City | null
Payment: Payment | null;
}
@Injectable({
providedIn: 'root'
})
export class CustomerService {
url: string = "http://localhost:53191/api/customer"
constructor(private http: HttpClient) { }

getCustomerList():Observable<Customer[]> {
return this.http.get<Customer[]>(this.url + "/getallclients")
}
getCustomerById(customerId: number): Observable<Customer> {
return this.http.get<Customer>(`${this.url}/GetCostomerByID/${customerId}`);
}
insertNewCustomer(customer: Customer): Observable<string> {
return this.http.post(`${this.url}/insertclient`, customer, {
responseType: 'text'
});
}
}