import { Component, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
  customers = signal<any[]>([]);
  currId: number | null = null;

  constructor(private customerService: CustomerService, private router: Router) {
    effect(() => {
      this.customerService.getCustomers().subscribe((data: any) => {
        this.customers.set(data); // Using signal to set customers
      });
    });
  }

  viewCustomerDetails(id: number) {
    this.currId = id;
    this.router.navigate(['/customer', id]);
  }
}
