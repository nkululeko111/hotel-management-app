// src/app/register/register.component.ts
import { Component } from '@angular/core';
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
  role: string = '';  // Add role property
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestore: Firestore 
  ) {}

  register() {
    this.authService.register(this.email, this.password, this.role)  // Pass role to register method
      .then((userCredential: UserCredential) => {  // Specify the type as UserCredential
        const user = userCredential.user;
        console.log('User created:', user);
        const userDocRef = doc(this.firestore, 'users', user.uid);  // Use this.firestore
        console.log('Document Reference:', userDocRef);
        setDoc(userDocRef, {
          email: this.email,
          role: this.role  // Include role in user document
        }).then(() => {
          console.log('User document created successfully');
          this.router.navigate(['/login']);
        }).catch((error) => {
          console.error('Error creating user document:', error);
        });
      }).catch(error => {
        this.handleError(error);
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
