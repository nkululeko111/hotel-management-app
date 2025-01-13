import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HotelService } from '../hotel.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-guest-dashboard',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './guest-dashboard.component.html',
  styleUrl: './guest-dashboard.component.css'
})

export class GuestDashboardComponent implements OnInit {
  rooms: any[] = [];
  filteredRooms: any[] = [];
  filterForm: FormGroup;
  bookings: any[] = [];
  feedback: any[] = [];

  constructor(private hotelService: HotelService, private fb: FormBuilder) {
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
      this.loadRooms(); // Reload to include new feedback
    });
  }
}

