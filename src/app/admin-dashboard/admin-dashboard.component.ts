import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../room.model';
import { AuthService } from '../auth.service';  // Import AuthService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AdminDashboardComponent implements OnInit {
  rooms: Room[] = [];
  newRoom: Room = { type: '', price: 0, capacity: 0, amenities: [] };

  constructor(
    private roomService: RoomService, private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
    });
  }

  addRoom() {
    this.roomService.addRoom(this.newRoom).then(() => {
      this.newRoom = { type: '', price: 0, capacity: 0, amenities: [] };
    });
  }

  updateRoom(room: Room) {
    this.roomService.updateRoom(room);
  }

  deleteRoom(room: Room) {
    if (room.id) {
      this.roomService.deleteRoom(room.id);
    }
  }
  logout() {
    this.authService.logout().then(() => {
      console.log('Logged out successfully');
      this.router.navigate(['/landing']);
    }).catch((error) => {
      console.error('Logout failed:', error);
    });
  }
}
