import { Component, NgZone } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, doc, setDoc } from '@angular/fire/firestore'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, MatGridListModule, MatCardModule, MatSelectModule, MatOptionModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  role: string = '';  
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore,
    private ngZone: NgZone // Inject NgZone here
  ) {}

  register() {
    this.ngZone.run(() => { // Wrap in NgZone to ensure proper change detection
      this.authService.register(this.email, this.password, this.role)  
        .then((userCredential: UserCredential) => { 
          const user = userCredential.user;
          console.log('User created:', user);
          const userDocRef = doc(this.firestore, 'users', user.uid);  

          setDoc(userDocRef, {
            email: this.email,
            role: this.role  
          }).then(() => {
            console.log('User document created with role:', this.role);
            this.router.navigate(['/login']);
          }).catch((error) => {
            console.error('Error creating user document:', error);
          });
        }).catch(error => {
          this.handleError(error);
        });
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private handleError(error: any) {
    if (error.code === 'auth/weak-password') {
      this.errorMessage = 'Password should be at least 6 characters.';
    } else if (error.code === 'auth/email-already-in-use') {
      this.errorMessage = 'The email address is already in use.';
    } else {
      this.errorMessage = 'Registration error: ' + error.message;
    }
  }
}
