import { TestBed } from '@angular/core/testing';
import { CustomerService } from './customer.service';
import { throwError } from 'rxjs';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return customers after delay', (done) => {
    const expectedCustomers = [
      { id: 1, name: "Katelyn Hardy", email: "a@aol.edu" },
      { id: 2, name: "Lunea Boone", email: "consequat.auctor.nunc@outlook.ca" },
      { id: 3, name: "Uriah Alford", email: "orci.adipiscing.non@aol.org" },
      { id: 4, name: "Dustin Garrett", email: "convallis.est@yahoo.edu" },
      { id: 5, name: "May Solis", email: "nisl@outlook.edu" }
    ];

    service.getCustomers().subscribe(customers => {
      expect(customers).toEqual(expectedCustomers);
      done();
    });
  });

  it('should retry and throw error if getCustomers fails', (done) => {
    spyOn(service['customers$'], 'pipe').and.returnValue(throwError('Failed to load customers'));

    service.getCustomers().subscribe({
      error: (error) => {
        expect(error).toBe('Failed to load customers');
        done();
      }
    });
  });

  it('should return customer details for a valid customer ID', (done) => {
    const customerId = 1;
    const expectedCustomer = { id: 1, name: "Katelyn Hardy", email: "a@aol.edu" };

    service.getCustomerDetails(customerId).subscribe(customer => {
      expect(customer).toEqual(expectedCustomer);
      done();
    });
  });

  it('should throw error if customer ID is invalid', (done) => {
    const invalidCustomerId = 999;

    service.getCustomerDetails(invalidCustomerId).subscribe({
      next: () => {},
      error: (error) => {

        expect(error).toBe('Customer not found');
        done();
      }
    });
  });

  it('should return orders for a valid customer ID', (done) => {
    const customerId = 1;
    const expectedOrders = [
      { orderId: 101, product: 'Laptop' },
      { orderId: 102, product: 'Phone' }
    ];

    service.getCustomerOrders(customerId).subscribe(orders => {
      expect(orders).toEqual(expectedOrders);
      done();
    });
  });

  it('should return empty array if customer has no orders', (done) => {
    const invalidCustomerId = 999;

    service.getCustomerOrders(invalidCustomerId).subscribe(orders => {
      expect(orders).toEqual([]);
      done();
    });
  });
});
