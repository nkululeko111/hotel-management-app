import { Injectable, NgZone } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, User, UserCredential } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, DocumentSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private ngZone = inject(NgZone);  // Inject NgZone to manage zone context

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  async register(email: string, password: string, role: string): Promise<UserCredential> {
    try {
      return await this.ngZone.run(() => 
        createUserWithEmailAndPassword(this.auth, email, password)
          .then(userCredential => {
            const userDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
            return setDoc(userDocRef, { email, role }).then(() => userCredential);
          })
      );
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await this.ngZone.run(() => 
        signInWithEmailAndPassword(this.auth, email, password)
      );
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.ngZone.run(() => signOut(this.auth));
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.ngZone.run(() => sendPasswordResetEmail(this.auth, email));
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    }
  }

  async getUserRole(uid: string): Promise<string | null> {
    try {
      return await this.ngZone.run(() => {
        const userDocRef = doc(this.firestore, `users/${uid}`);
        return getDoc(userDocRef).then(userDoc => {
          if (userDoc.exists()) {
            const role = userDoc.data()?.['role'] || null;
            console.log('Retrieved Role:', role);
            return role;
          }
          return null;
        });
      });
    } catch (error) {
      console.error('Error retrieving user role:', error);
      throw error;
    }
  }
}
