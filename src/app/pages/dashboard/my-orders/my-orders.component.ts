import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PeriodicElement } from '../overview/overview.component';
import { ClientFormModel } from 'src/app/models/client-form.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  panelOpenState = true;
  userOrders: ClientFormModel[] = [];

  constructor(public orderService: OrderService, public authService: AuthService) { }

  ngOnInit() {
    this.orderService.getClientOrders(this.authService.currentUser.email).subscribe(res => {
      for (const order of res) {
        for (const _package of order.packagesList) {
          console.log(_package);
        }
      }
      this.userOrders = res;
    });
  }

}
