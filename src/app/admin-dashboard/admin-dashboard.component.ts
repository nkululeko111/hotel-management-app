import { Component, OnInit } from '@angular/core';
import { RoomService } from '../room.service';
import { Room } from '../room.model';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AdminDashboardComponent implements OnInit {
  rooms: Room[] = [];
  newRoom: Room = { type: '', price: 0, capacity: 0, amenities: [] };

  constructor(private roomService: RoomService) {}

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
}
