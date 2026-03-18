import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service'; // ה ייבוא- service
import { RouterOutlet } from '@angular/router';
import { DisplayCarsComponent } from '../display-cars/display-cars.component';
import { FormsModule } from '@angular/forms';
import { Customer } from '../services/customer.service'; // הלקוח של הממשק ייבוא
import { CommonModule } from '@angular/common'; // הוספת CommonModule
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive} from '@angular/router'; // הוספת RouterLink ו-RouterLinkActive
@Component({
selector: 'app-login',
standalone: true,
imports: [FormsModule, CommonModule],
templateUrl: './login.component.html',
styleUrl: './login.component.css',

})


export class LoginComponent {
title = 'car-client';
customer: Customer | null = null;
errorMessage: string = '';
showModal: boolean = false;
newCustomer: Customer = {
id: 0,
firstName: '',
lastName: '',
email: '',
address: '',
numRents: 0,
codePayment: 1,
codeCity: 1,
City: null,
Payment: null
};
constructor(private customerService: CustomerService, private router: Router) {} // הזרקת
resetForm() {
this.newCustomer = {
id: 0,
firstName: '',
lastName: '',
email: '',
address: '',
numRents: 0,
codePayment: 1,
codeCity: 1,
City: null,
Payment: null
};
}
checkId() {
const userId = Number((<HTMLInputElement>document.getElementById('userId')).value);


    if (userId === 1234) {
      localStorage.setItem('userName', 'Admin');
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('customerId', '1234');
      alert('ברוך הבא, מנהל המערכת!');
      this.router.navigate(['/dashboard/displayCars']);
      return;
    }
if (!userId) {
this.errorMessage = 'Please enter a valid ID.';
return;
}
this.customerService.getCustomerById(Number(userId)).subscribe({
next: (customer) => {
  if (customer ) {
    this.customer = customer;
    this.errorMessage = '';
    
    // שמירה בטוחה ב-LocalStorage
    localStorage.setItem('userName', customer.firstName || '');
    localStorage.setItem('customerId', customer.id.toString());

    alert('Customer found: ' + customer.firstName + ' ' + customer.lastName);
    
    // ניווט לנתיב המלא של התצוגה בתוך הדשבורד
    this.router.navigate(['/dashboard/displayCars']);
  } else {
    this.showModal = true;
  }
},
error: (error) => {
this.errorMessage = 'Customer not found.';
this.customer = null;
this.showModal = true;
}
});
}
 
closeModal() {
this.showModal = false;
this.resetForm();
}
submitNewCustomer() {
const customerToSend = {
id: this.newCustomer.id,
firstName: this.newCustomer.firstName,
lastName: this.newCustomer.lastName,
email: this.newCustomer.email,
address: this.newCustomer.address,
numRents: this.newCustomer.numRents || 0,
codeCity: 1,
codePayment: 1
};
this.customerService.insertNewCustomer(customerToSend as any).subscribe({
next: (response) => {
alert('!הלקוח נוסף בהצלחה');
this.showModal = false;
this.resetForm();
localStorage.setItem('userName', customerToSend.firstName);
localStorage.setItem('customerId', customerToSend.id.toString());
this.router.navigate(['/dashboard']);
},
error: (err) => {
console.error('בשרת שגיאה:', err);
if (err.status === 200) {
alert('111');
this.showModal = false;
this.resetForm();
} else {
alert('לקוח בהוספת שגיאה: ' +( err.error?.message || err.message));
}
}
});
}
}