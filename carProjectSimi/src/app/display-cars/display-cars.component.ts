import { Component } from '@angular/core';
import { CarsComponent } from '../cars/cars.component';
import { Car } from '../services/car.service';
import { RentService } from '../services/rent.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // ייבוא ה-Router חובה

@Component({
  selector: 'app-display-cars',
  standalone: true,
  imports: [CarsComponent, CommonModule, FormsModule],
  templateUrl: './display-cars.component.html',
  styleUrl: './display-cars.component.css'
})
export class DisplayCarsComponent {
  arr: Car[] = [];
  filteredCars: Car[] = [];
  startDate: string = '';
  endDate: string = '';
  datesSelected: boolean = false; 

  selectedSeats: number | null = null;
  maxPrice: number | null = null;
  selectedLevel: number | null = null;
  selectedFilter: string = ''; 

  // הוספנו את router ל-constructor כדי ש-viewMyRents ו-logout יעבדו
  constructor(private rentService: RentService, private router: Router) {}

  // פונקציות הניהול שהיו חסרות או גרמו לשגיאה:
  
 
  // --- שאר הפונקציות שלך (נשארות אותו דבר) ---

  searchAvailableCars() {
    if (!this.startDate || !this.endDate) return;
    const requestedStart = new Date(this.startDate);
    const requestedEnd = new Date(this.endDate);

    this.rentService.getAvailableCars(requestedStart, requestedEnd).subscribe(cars => {
      this.arr = [];
      this.filteredCars = [];
      cars.forEach(car => {
        this.rentService.getRentByCarId(car.code).subscribe(rents => {
          let isOccupied = false;
          if (rents && rents.length > 0) {
            isOccupied = rents.some(rent => {
              const rentStart = new Date(rent.startDate);
              const rentEnd = new Date(rent.endDate);
              return requestedStart <= rentEnd && requestedEnd >= rentStart;
            });
          }
          if (!isOccupied) {
            this.arr.push(car);
            this.applyFilters();
          }
        });
      });
      this.datesSelected = true;
    });
  }

  applyFilters() {
    let tempCars = [...this.arr];
    if (this.selectedFilter === 'seats' && this.selectedSeats !== null) {
      tempCars = tempCars.filter(c => c.numSeats === this.selectedSeats);
    } else if (this.selectedFilter === 'price' && this.maxPrice !== null) {
      tempCars = tempCars.filter(c => c.priceForDay <= this.maxPrice!);
    } else if (this.selectedFilter === 'level' && this.selectedLevel !== null) {
      tempCars = tempCars.filter(c => c.level === this.selectedLevel);
    } 
    this.filteredCars = tempCars;
  }

  resetSecondaryFilters() {
    this.selectedSeats = null;
    this.maxPrice = null;
    this.selectedLevel = null;
    this.selectedFilter = '';
    this.applyFilters();
  }

  onFilterChange() {
    this.selectedSeats = null;
    this.maxPrice = null;
    this.selectedLevel = null;
    this.applyFilters();
  }
}