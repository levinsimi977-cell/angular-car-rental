import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// הגדרת ממשק Car לפי הנתונים שמתקבלים מה-API
export interface Car {
  code: number;
  numSeats: number;
  level: number;
  priceForDay: number;
  priceForThreeDaysAndMore: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  url: string = 'http://localhost:53191/api/car';

  constructor(private http: HttpClient) {}

  // קריאה להחזרת כל הרכבים
  getCarsList(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/getallcars`);
  }

  // קריאה להוספת רכב חדש
  insertCar(car: Car): Observable<string> {
    return this.http.post<string>(`${this.url}/insertcar`, car);
    responseType: 'text'
  }

  // קריאה לעדכון רכב
  updateCar(car: Car): Observable<number> {
    return this.http.put<number>(`${this.url}/updatecar/${car.code}`, car);
  }

  // קריאה למחיקת רכב
  deleteCar(carCode: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/deletecar/${carCode}`);
  }

  // קריאה לסינון רכבים לפי מספר מושבים
  getCarsBySeats(numSeats: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/getcarsbyseats?numseats=${numSeats}`);
  }

  // קריאה לסינון רכבים לפי רמה
  getCarsByLevel(level: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/getcarsbylevel?level=${level}`);
  }

  // קריאה לסינון רכבים לפי מחיר ליום
  getCarsByPriceForDay(price: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/getcarsbypriceforDay?price=${price}`);
  }

  // קריאה לסינון רכבים לפי כל הקריטריונים (רמה, מחיר, מספר מושבים)
  getCarsByAllCriterions(level: number, price: number, numSeats: number): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.url}/getcarsbyallcriterions?level=${level}&price=${price}&numseats=${numSeats}`);
  }
}