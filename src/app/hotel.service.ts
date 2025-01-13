
// hotel.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rooms`);
  }

  getUserBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings`);
  }

  bookRoom(roomId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, { roomId });
  }

  submitFeedback(roomId: number, comment: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/rooms/${roomId}/feedback`, { comment });
  }
}
