import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword() {
    this.authService.resetPassword(this.email)
      .then(() => {
        this.successMessage = 'Password reset email sent. Check your inbox.';
        this.errorMessage = '';
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private handleError(error: any) {
    if (error.code === 'auth/user-not-found') {
      this.errorMessage = 'No account found with this email.';
      this.successMessage = '';
    } else {
      this.errorMessage = 'Reset error: ' + error.message;
      this.successMessage = '';
    }
  }
}
