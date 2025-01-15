// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { GuestDashboardComponent } from './guest-dashboard/guest-dashboard.component';
import { RoleGuard } from './role.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },  
  { path: 'landing', component: LandingPageComponent }, 
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'guest-dashboard', component: GuestDashboardComponent},
];
