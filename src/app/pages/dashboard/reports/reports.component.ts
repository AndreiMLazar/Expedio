import { Component, OnInit, ViewChild } from '@angular/core';
import { Label, MultiDataSet, BaseChartDirective } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  @ViewChild(BaseChartDirective, { static: true }) public chart: BaseChartDirective;
  public agentOrders = 1;
  public clientOrders = 3;
  public companyOrders = 2;

  public expedioColors: Array<any> = [
    {
      backgroundColor: ['#23376e', '#3a5bb5', '#b4b4b4'],
      borderColor: 'rgba(35, 55, 110, 0.1)',
      pointBackgroundColor: 'rgba(35, 55, 110, 0.4)',
      pointBorderColor: '#fffdfc',
      pointHoverBackgroundColor: '#fffdfc',
      pointHoverBorderColor: 'rgba(58, 91, 181, 1)'
    }
  ];

  // Doughnut
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: Label[] = ['Agent Orders', 'Client Orders', 'Company Orders'];
  public doughnutChartData: MultiDataSet = [[this.agentOrders, this.clientOrders, this.companyOrders]];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  constructor(private orderService: OrderService,
    private authService: AuthService) { }

  ngOnInit() {
    this.orderService.getAdminOrders(this.authService.currentUser.email).subscribe(res => {
      this.agentOrders = res.agentOrders;
      this.clientOrders = res.clientOrders;
      this.companyOrders = res.companyOrders;
      this.doughnutChartData.slice();
    });

    setTimeout(() => {
      this.chart.update();
  }, 2000);
  }

}
