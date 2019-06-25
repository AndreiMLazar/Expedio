import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClientFormModel } from 'src/app/models/client-form/client-form.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {
  panelOpenState = true;
  userOrders: ClientFormModel[] = [];

  constructor(public orderService: OrderService,
              public authService: AuthService,
              private router: Router) { }

  exportPDF(awb: string) {
    this.router.navigate(['/pdf-export', awb], { replaceUrl: true });
  }

  ngOnInit() {
    this.orderService.getClientOrders(this.authService.currentUser.email).subscribe(res => {
      this.userOrders = res;
    });
  }
}
