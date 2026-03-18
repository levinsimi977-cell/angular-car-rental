import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Router } from '@angular/router'; 
@Component({
  selector: 'app-template',
  standalone: true, 
  imports: [RouterModule, CommonModule], 
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent { 
  constructor(private router: Router) {}
  get userName() {
    return localStorage.getItem('userName');
  }

  isLoggedIn() {
    return !!localStorage.getItem('customerId');
  }

  viewMyRents() {
    // ודאי שהגדרת את הנתיב הזה ב-routes (הסבר בשלב 2)
    this.router.navigate(['/dashboard/my-rents']); 
  }


get isAdmin() {
    return localStorage.getItem('userRole') === 'admin';
  }
  logout() {
    localStorage.clear(); // מוחק את ה-ID והשם
    this.router.navigate(['/']); // מחזיר לעמוד הלוגין
  }

}