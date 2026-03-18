import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface City{
  code:number
  name:string
 

}
@Injectable({
  providedIn: 'root'
})


export class CityService {
url:string="http://localhost:53191/api/city"
  constructor(private http:HttpClient) { }

        getCarsList():Observable<City[]>{//מה היא הולכת להחזיר
           return this.http.get<City[]>(this.url+"/GetAllCities")
        }

}
