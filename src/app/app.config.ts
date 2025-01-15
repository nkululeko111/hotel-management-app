import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http'; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEVi972fgO-9dE3sJd_L4dgZe_CyblG6U",
  authDomain: "hotel-management-app-7a9ce.firebaseapp.com",
  projectId: "hotel-management-app-7a9ce",
  storageBucket: "hotel-management-app-7a9ce.firebasestorage.app",
  messagingSenderId: "205145798406",
  appId: "1:205145798406:web:eafbdffde4e79af148d087",
  measurementId: "G-VK8HD22DFB"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = (typeof window !== 'undefined') ? (isSupported().then((supported) => supported ? getAnalytics(app) : null).catch(console.error)) : null;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideFirebaseApp(() => app),
    provideAuth(() => getAuth(app)),
    provideFirestore(() => getFirestore(app)),
    provideHttpClient(),
    provideAnimationsAsync()
  ]
};
