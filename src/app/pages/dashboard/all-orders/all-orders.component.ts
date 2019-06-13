import { Component, OnInit } from '@angular/core';
import { ClientFormModel } from 'src/app/models/client-form.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  displayedColumns: string[] = ['Recipient Name', 'Recipient Address', 'Loading Address',
    'Deposit Address', 'Packages'];
  dataSource: ClientFormModel[] = [];

  constructor(public orderService: OrderService, public authService: AuthService) { }

  ngOnInit() {
    this.orderService.getClientOrders(this.authService.currentUser.email).subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
    });
  }
}
