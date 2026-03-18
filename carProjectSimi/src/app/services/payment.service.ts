import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Payment{
  code:number
  creaditCard:string
  validity:string
  cvc:number
  

}
@Injectable({
  providedIn: 'root'
})


export class PaymentService {
url:string="http://localhost:53191/api/city"
  constructor(private http:HttpClient) { }

        getCarsList():Observable<Payment[]>{//מה היא הולכת להחזיר
           return this.http.get<Payment[]>(this.url+"/GetAllPayment")
        }

}
