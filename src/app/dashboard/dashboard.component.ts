import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc, getFirestore } from 'firebase/firestore'; // Simplify Firestore imports
import { Unsubscribe } from '@firebase/util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent implements OnInit, OnDestroy {
  email: string | null = '';
  private authListenerUnsubscribe!: Unsubscribe;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: Auth,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(async (user) => {
      if (user) {
        this.email = user.email;
        console.log('User UID:', user.uid);
        const db = getFirestore();
        const userDocRef = doc(db, 'users', user.uid);
        console.log('Document Reference:', userDocRef);

        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('User Data:', userData);
        } else {
          console.warn('Document does not exist for user:', user.uid);
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authListenerUnsubscribe) {
      this.authListenerUnsubscribe();
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/landing']);
    });
  }
}
