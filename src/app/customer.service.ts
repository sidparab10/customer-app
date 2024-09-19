import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { of, throwError } from 'rxjs';
import { delay, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customers = signal([
    {
      id: 1,
      name: "Katelyn Hardy",
      email: "a@aol.edu"
    },
    {
      id: 2,
      name: "Lunea Boone",
      email: "consequat.auctor.nunc@outlook.ca"
    },
    {
      id: 3,
      name: "Uriah Alford",
      email: "orci.adipiscing.non@aol.org"
    },
    {
      id: 4,
      name: "Dustin Garrett",
      email: "convallis.est@yahoo.edu"
    },
    {
      id: 5,
      name: "May Solis",
      email: "nisl@outlook.edu"
    }
  ]);

  private customers$ = toObservable(this.customers)

  private orders = signal<any>({
    1: [{ orderId: 101, product: 'Laptop' }, { orderId: 102, product: 'Phone' }],
    2: [{ orderId: 103, product: 'Tablet' }],
    3: [{ orderId: 104, product: 'Monitor' }],
    4: [{ orderId: 105, product: 'Monitor' }, { orderId: 106, product: 'Phone' }],
    5: [{ orderId: 107, product: 'Laptop' }, { orderId: 108, product: 'Phone' }],
  });

  constructor() { }

  getCustomers() {
    return this.customers$.pipe(
      delay(1000),
      retry(2),
      catchError(err => throwError('Failed to load customers'))
    );
  }

  getCustomerDetails(id: number) {
    const customer = this.customers().find(c => c.id === id);
    if (customer) {
      return of(customer).pipe(delay(1000));
    } else {
      return throwError('Customer not found');
    }
  }

  getCustomerOrders(id: number) {
    const customerOrders = this.orders()[id] || [];
    return of(customerOrders).pipe(delay(1000));
  }
}
