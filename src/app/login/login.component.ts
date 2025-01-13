import { Component, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {}

  login() {
    this.ngZone.run(() => { // Wrap in NgZone to ensure proper change detection
      this.authService.login(this.email, this.password)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          return this.authService.getUserRole(uid); 
        })
        .then((role) => {
          if (role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'guest') {
            this.router.navigate(['/guest-dashboard']);
          } else {
            this.errorMessage = 'Invalid role. Please contact support.';
          }
        })
        .catch((error) => {
          this.handleError(error);
        });
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goToResetPassword() {
    this.router.navigate(['/reset-password']);
  }

  private handleError(error: any) {
    if (error.code === 'auth/user-not-found') {
      this.errorMessage = 'No account found with this email.';
    } else if (error.code === 'auth/wrong-password') {
      this.errorMessage = 'Incorrect password. Please try again.';
    } else if (error.code === 'auth/network-request-failed') {
      this.errorMessage = 'Network error. Please check your internet connection and try again.';
    } else {
      this.errorMessage = 'Login error: ' + error.message;
    }
  }
}
