import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const user = this.authService.currentUser; // Ensure you have a currentUser getter
    if (user) {
      const role = await this.authService.getUserRole(user.uid);
      if (role === 'Admin') {
        this.router.navigate(['/admin-dashboard']);
      } else if (role === 'Staff') {
        this.router.navigate(['/guest-dashboard']);
      } else if (role === 'Guest') {
        this.router.navigate(['/guest-dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
