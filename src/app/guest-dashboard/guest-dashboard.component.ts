import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-dashboard',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './guest-dashboard.component.html',
  styleUrls: ['./guest-dashboard.component.css'] // Corrected property name
})
export class GuestDashboardComponent implements OnInit {
  rooms: any[] = [];
  filteredRooms: any[] = [];
  filterForm: FormGroup;
  bookings: any[] = [];
  feedback: any[] = [];
  

  constructor(
    private hotelService: HotelService, private router: Router,
    private fb: FormBuilder,
    private authService: AuthService // Inject AuthService
  ) {
    this.filterForm = this.fb.group({
      type: [''],
      price: [''],
      capacity: ['']
    });
  }

  ngOnInit(): void {
    this.loadRooms();
    this.loadBookings();
  }

  loadRooms(): void {
    this.hotelService.getRooms().subscribe((data: any) => {
      this.rooms = data;
      this.filteredRooms = data;
    });
  }

  loadBookings(): void {
    this.hotelService.getUserBookings().subscribe((data: any) => {
      this.bookings = data;
    });
  }

  applyFilters(): void {
    const { type, price, capacity } = this.filterForm.value;
    this.filteredRooms = this.rooms.filter(room => {
      return (
        (!type || room.type === type) &&
        (!price || room.price <= price) &&
        (!capacity || room.capacity >= capacity)
      );
    });
  }

  bookRoom(roomId: number): void {
    this.hotelService.bookRoom(roomId).subscribe((response: any) => {
      alert('Room booked successfully!');
      this.loadBookings();
    });
  }

  leaveFeedback(roomId: number, comment: string): void {
    this.hotelService.submitFeedback(roomId, comment).subscribe((response: any) => {
      alert('Feedback submitted!');
      this.loadRooms(); 
    });
  }

  // Method to handle logout
  logout() {
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
      this.router.navigate(['/landing']);
    }).catch((error) => {
      console.error('Logout failed:', error);
    });
  }
}
