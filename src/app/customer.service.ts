import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, addDoc, setDoc, deleteDoc, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customersCollection;

  constructor(private firestore: Firestore) {
    this.customersCollection = collection(this.firestore, 'customers');
  }

  getCustomers(): Observable<Customer[]> {
    return collectionData(this.customersCollection, { idField: 'id' }) as Observable<Customer[]>;
  }

  getCustomer(id: string): Observable<Customer> {
    const customerDocRef = doc(this.firestore, `customers/${id}`);
    return docData(customerDocRef, { idField: 'id' }) as Observable<Customer>;
  }

  addCustomer(customer: Customer) {
    return addDoc(this.customersCollection, customer);
  }

  updateCustomer(customer: Customer) {
    const customerDocRef = doc(this.firestore, `customers/${customer.id}`);
    return setDoc(customerDocRef, customer);
  }

  deleteCustomer(id: string) {
    const customerDocRef = doc(this.firestore, `customers/${id}`);
    return deleteDoc(customerDocRef);
  }
}
