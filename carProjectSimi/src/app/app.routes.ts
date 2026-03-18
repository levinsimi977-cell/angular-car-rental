import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // שם הקובץ הוא login.component והמחלקה היא Login
import { TemplateComponent } from './template/template.component'; // ודאי שזה תואם לשם הקובץ בתיקיית main
import { DisplayCarsComponent } from './display-cars/display-cars.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component'; 
import { MyRentsComponent } from './my-rents/my-rents.component';
import { AddCarComponent } from './add-car/add-car.component';



export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { 
    path: 'dashboard', 
     component: TemplateComponent, 
    children: [
       { path: 'displayCars', component: DisplayCarsComponent },
      { path: 'about', component: AboutComponent },
     { path: 'addCar', component: AddCarComponent },

      { path: 'contact', component: ContactComponent },
     { path: 'template', component: TemplateComponent },
{ path: 'my-rents', component: MyRentsComponent },
      { path: '', redirectTo: 'cars', pathMatch: 'full' } 
    ]
  },
  { path: '**', redirectTo: '' }
];