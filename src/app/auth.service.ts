import { Injectable, NgZone } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, User, UserCredential } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private ngZone: NgZone
  ) {}

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  async register(email: string, password: string, role: string): Promise<UserCredential> {
    console.log('Attempting to register...');
    try {
      const userCredential = await this.ngZone.run(() => createUserWithEmailAndPassword(this.auth, email, password));
      console.log('User registered:', userCredential);

      const userDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await this.ngZone.run(() => setDoc(userDocRef, { email, role }));

      console.log('User document created with role:', role);
      return userCredential;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<UserCredential> {
    console.log('Attempting to log in...');
    try {
      const userCredential = await this.ngZone.run(() => signInWithEmailAndPassword(this.auth, email, password));
      console.log('Login successful:', userCredential);
      return userCredential;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    console.log('Attempting to log out...');
    try {
      await this.ngZone.run(() => signOut(this.auth));
      console.log('Logout successful');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    console.log('Attempting to send password reset email...');
    try {
      await this.ngZone.run(() => sendPasswordResetEmail(this.auth, email));
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    }
  }

  async getUserRole(uid: string): Promise<string | null> {
    console.log('Attempting to get user role...');
    try {
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await this.ngZone.run(() => getDoc(userDocRef));
      const role = userDoc.exists() ? userDoc.data()?.['role'] : null;
      console.log('User role retrieved:', role);
      return role;
    } catch (error) {
      console.error('Error retrieving user role:', error);
      throw error;
    }
  }
}
