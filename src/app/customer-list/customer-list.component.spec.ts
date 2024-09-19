import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerListComponent } from './customer-list.component';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let mockCustomerService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockCustomerService = jasmine.createSpyObj('CustomerService', ['getCustomers']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: Router, useValue: mockRouter }
      ],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch customers on init', () => {
    const mockCustomers = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }];
    mockCustomerService.getCustomers.and.returnValue(of(mockCustomers));

    fixture.detectChanges(); 

    expect(mockCustomerService.getCustomers).toHaveBeenCalled();
    expect(component.customers()).toEqual(mockCustomers);
  });

  it('should navigate to customer details when viewCustomerDetails is called', () => {
    const customerId = 1;

    component.viewCustomerDetails(customerId);

    expect(component.currId).toBe(customerId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/customer', customerId]);
  });
});
