import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // חובה עבור ngIf ו-CurrencyPipe
import { Car } from '../services/car.service'; 
import { RentService, Rent } from '../services/rent.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule], // הוספנו את CommonModule
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.css'
})
export class CarsComponent {
  @Input() car: Car | null = null;
  @Input() selectedStart: any; 
  @Input() selectedEnd: any;

  // הזרקת השירות ב-Constructor
  constructor(private rentService: RentService) {}

  private getDates() {
    return {
      start: new Date(this.selectedStart),
      end: new Date(this.selectedEnd)
    };
  }

  getPriceBreakdown() {
    if (!this.car || !this.selectedStart || !this.selectedEnd) return null;
    const { start, end } = this.getDates();
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    // חישוב ימים: חילוק במילישניות של יום + 1 כדי לכלול את יום הסיום
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const isSpecialRate = diffDays >= 3;
    const currentRate = isSpecialRate ? this.car.priceForThreeDaysAndMore : this.car.priceForDay;

    return {
      days: diffDays,
      total: diffDays * currentRate,
      dailyRate: currentRate,
      isDiscounted: isSpecialRate
    };
  }
 
  rentCar() {
    const bill = this.getPriceBreakdown();
    if (!this.car || !bill) return;

    const { start, end } = this.getDates();

    // הגדרת קוד לקוח - כרגע סטטי (1), בהמשך תוכלי למשוך משירות ה-Login
const storedId = localStorage.getItem('customerId');
    const newRent: Rent = {
      code: 0,
      codeCar: this.car.code,
      codeCustomer: Number(storedId),
      startDate: start,
      endDate: end,
      goal: `השכרה ל-${bill.days} ימים`
    };

    this.rentService.insertRent(newRent).subscribe({
      next: (response) => {
        // שימוש ב-Template Literal להודעה יוקרתית
        alert(`🎉 ההזמנה בוצעה בהצלחה!\n` +
              `---------------------------\n` +
              `רכב קוד: ${this.car?.code}\n` +
              `מספר ימים: ${bill.days}\n` +
              `מחיר סופי: ₪${bill.total}`);
        // רינדור מחדש
        window.location.reload(); 
      },
      error: (err) => {
        console.error("שגיאה בהוספת השכרה:", err);
        alert("חלה שגיאה בביצוע ההזמנה. וודא שהשרת פועל.");
      }
    });
  }
}