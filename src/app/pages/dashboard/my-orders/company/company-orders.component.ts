import { Component, OnInit } from '@angular/core';
import { CompanyFormModel } from 'src/app/models/company-form/company-form.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-orders',
  templateUrl: './company-orders.component.html',
  styleUrls: ['../orders.component.scss']
})
export class CompanyOrdersComponent implements OnInit {
  panelOpenState = true;
  userOrders: CompanyFormModel[] = [];

  constructor(public orderService: OrderService,
              public authService: AuthService,
              private router: Router) { }

  exportPDF(awb: string) {
    this.router.navigate(['/pdf-export', awb], { replaceUrl: true });
  }

  ngOnInit() {
    this.orderService.getCompanyOrders(this.authService.currentUser.email).subscribe(res => {
      this.userOrders = res;
    });
  }
}
