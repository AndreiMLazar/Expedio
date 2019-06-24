import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientFormModel } from 'src/app/models/client-form/client-form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  panelOpenState = true;
  userOrders = [];

  constructor(public orderService: OrderService,
              public authService: AuthService,
              private router: Router) { }

  exportPDF(awb: string) {
    this.router.navigate(['/pdf-export', awb], { replaceUrl: true });
  }

  ngOnInit() {
    switch (this.authService.currentUser.userType) {
      case 'company':
        this.orderService.getCompanyOrders(this.authService.currentUser.email).subscribe(res => {
          this.userOrders = res;
        });
        break;

      case 'client':
        this.orderService.getClientOrders(this.authService.currentUser.email).subscribe(res => {
          this.userOrders = res;
        });
        break;

      default:
        break;
    }
  }
}
