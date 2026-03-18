import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule], 
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent { }