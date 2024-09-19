import { Component, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent {
  customer = signal<any>(null);
  orders = signal<any[]>([]);

  constructor(private route: ActivatedRoute, private customerService: CustomerService) {
    effect(() => {
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = +params.get('id')!;
          return this.customerService.getCustomerDetails(id);
        })
      ).subscribe(customer => {
        this.customer.set(customer);
        this.loadOrders(customer.id);
      });
    });
  }

  loadOrders(id: number) {
    this.customerService.getCustomerOrders(id).subscribe(orders => {
      this.orders.set(orders);
    });
  }
}
