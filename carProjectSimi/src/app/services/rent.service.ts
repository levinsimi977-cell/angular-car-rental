import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './car.service';

export interface Rent {
  code: number;
  codeCustomer: number;
  codeCar: number;
  startDate: Date;
  endDate: Date;
  goal: string;
}

@Injectable({
  providedIn: 'root',
})
export class RentService {
  private url: string = 'http://localhost:53191/api/rent'; // לפי הפורט של ה-CarService שלך

  constructor(private http: HttpClient) {}

  // פונקציה לקבלת השכרות לפי קוד רכב - תואם ל-Controller שלך
  getRentByCarId(id: number): Observable<Rent[]> {
    return this.http.get<Rent[]>(`${this.url}/getrentbyid/${id}`);
  }

  // פונקציה לביצוע השכרה חדשה
  insertRent(rent: Rent): Observable<string> {
    return this.http.post<string>(`${this.url}/insertrent`, rent);
  }
getAvailableCars(start: Date, end: Date): Observable<Car[]> {
    // שימוש ב-Query String במקום בנתיב הישיר
    const startStr = start.toISOString();
    const endStr = end.toISOString();
    
    return this.http.get<Car[]>(
        `${this.url}/getrentthatavailablefromtoo?start=${startStr}&end=${endStr}`
    );
}
getRentByCustomerid(id: number): Observable<Rent[]> {
  return this.http.get<Rent[]>(`${this.url}/getrentbycustomerid/${id}`);
}
}