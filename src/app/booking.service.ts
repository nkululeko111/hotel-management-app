import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, addDoc, setDoc, deleteDoc, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsCollection;

  constructor(private firestore: Firestore) {
    this.bookingsCollection = collection(this.firestore, 'bookings');
  }

  getBookings(): Observable<Booking[]> {
    return collectionData(this.bookingsCollection, { idField: 'id' }) as Observable<Booking[]>;
  }

  getBooking(id: string): Observable<Booking> {
    const bookingDocRef = doc(this.firestore, `bookings/${id}`);
    return docData(bookingDocRef, { idField: 'id' }) as Observable<Booking>;
  }

  addBooking(booking: Booking) {
    return addDoc(this.bookingsCollection, booking);
  }

  updateBooking(booking: Booking) {
    const bookingDocRef = doc(this.firestore, `bookings/${booking.id}`);
    return setDoc(bookingDocRef, booking);
  }

  deleteBooking(id: string) {
    const bookingDocRef = doc(this.firestore, `bookings/${id}`);
    return deleteDoc(bookingDocRef);
  }
}
