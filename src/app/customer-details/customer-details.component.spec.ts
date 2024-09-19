import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerDetailsComponent } from './customer-details.component';
import { CustomerService } from '../customer.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;
  let mockCustomerService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockCustomerService = jasmine.createSpyObj('CustomerService', ['getCustomerDetails', 'getCustomerOrders']);
    mockActivatedRoute = {
      paramMap: of({
        get: (key: string) => '1' 
      })
    };

    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailsComponent ],
      providers: [
        { provide: CustomerService, useValue: mockCustomerService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [RouterTestingModule] 
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch customer details and load orders on init', () => {
    const mockCustomer = { id: 1, name: 'John Doe' };
    const mockOrders = [{ id: 101, item: 'Laptop' }, { id: 102, item: 'Phone' }];
    
    mockCustomerService.getCustomerDetails.and.returnValue(of(mockCustomer));
    mockCustomerService.getCustomerOrders.and.returnValue(of(mockOrders));

    fixture.detectChanges();

    expect(mockCustomerService.getCustomerDetails).toHaveBeenCalledWith(1);
    expect(component.customer()).toEqual(mockCustomer);

    expect(mockCustomerService.getCustomerOrders).toHaveBeenCalledWith(1);
    expect(component.orders()).toEqual(mockOrders);
  });
});
