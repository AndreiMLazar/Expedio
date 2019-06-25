import { Component, OnInit } from '@angular/core';
import { AgentFormModel } from 'src/app/models/agent-form/agent-form.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-orders',
  templateUrl: './agent-orders.component.html',
  styleUrls: ['./agent-orders.component.scss']
})
export class AgentOrdersComponent implements OnInit {
  panelOpenState = true;
  userOrders: AgentFormModel[] = [];

  constructor(public orderService: OrderService,
              public authService: AuthService,
              private router: Router) { }

  exportPDF(awb: string) {
    this.router.navigate(['/pdf-export', awb], { replaceUrl: true });
  }

  ngOnInit() {
    this.orderService.getAgentOrders(this.authService.currentUser.email).subscribe(res => {
      console.log(res);
      this.userOrders = res;
    });
  }

}
