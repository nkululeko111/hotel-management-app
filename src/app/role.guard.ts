import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  async canActivate(): Promise<boolean> {
    const user = this.authService.currentUser;
    if (user) {
      const role = await this.authService.getUserRole(user.uid);
      this.ngZone.run(() => {
        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'guest') {
          this.router.navigate(['/guest-dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      });
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
