import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, addDoc, setDoc, deleteDoc, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Room } from './room.model';  // Create a model for Room

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomsCollection;

  constructor(private firestore: Firestore) {
    this.roomsCollection = collection(this.firestore, 'rooms');
  }

  getRooms(): Observable<Room[]> {
    return collectionData(this.roomsCollection, { idField: 'id' }) as Observable<Room[]>;
  }

  getRoom(id: string): Observable<Room> {
    const roomDocRef = doc(this.firestore, `rooms/${id}`);
    return docData(roomDocRef, { idField: 'id' }) as Observable<Room>;
  }

  addRoom(room: Room) {
    return addDoc(this.roomsCollection, room);
  }

  updateRoom(room: Room) {
    const roomDocRef = doc(this.firestore, `rooms/${room.id}`);
    return setDoc(roomDocRef, room);
  }

  deleteRoom(id: string) {
    const roomDocRef = doc(this.firestore, `rooms/${id}`);
    return deleteDoc(roomDocRef);
  }
}
