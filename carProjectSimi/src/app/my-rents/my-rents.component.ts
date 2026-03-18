import { Component, OnInit } from '@angular/core';
import { RentService, Rent } from '../services/rent.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-rents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-rents.component.html',
  styleUrl: './my-rents.component.css'
})
export class MyRentsComponent implements OnInit {
  myRents: Rent[] = [];
  loading: boolean = true;

  constructor(private rentService: RentService) {}

  ngOnInit() {
    const customerId = localStorage.getItem('customerId');
    if (customerId) {
      this.rentService.getRentByCustomerid(Number(customerId)).subscribe({
        next: (data) => {
          this.myRents = data;
          this.loading = false;
        },
        error: (err) => {
          console.error("שגיאה בטעינת הזמנות", err);
          this.loading = false;
        }
      });
    }
  }
}