import { Booking } from "./booking.model";

export interface Customer {
    id?: string;
    name: string;
    email: string;
    phone: string;
    bookings: Booking[];
  }
  