import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Car, CarService } from '../services/car.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent {
  newCar: Car = {
    code: 0,
    numSeats: 0,
    level: 1,
    priceForDay: 0,
    priceForThreeDaysAndMore: 0
  };

  constructor(private carService: CarService, private router: Router) {}
saveCar() {
  this.carService.insertCar(this.newCar).subscribe({
    next: (res) => {
      console.log("תשובת השרת:", res);
      alert('הרכב נשמר! עוברת להצגת רכבים...');
      // ניווט יחסי בלבד

      this.router.navigate(['/dashboard/displayCars']);
    },
    error: (err) => {
      console.error("שגיאת שרת אמיתית:", err);
      alert('השרת החזיר שגיאה - בדקי את ה-Console');
    }
  });
}
}