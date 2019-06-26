import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ClientFormModel } from 'src/app/models/client-form/client-form.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, AfterViewInit {
  state = 'none';
  displayedColumns: string[] = ['AWB', 'Sender Email', 'Sender Address', 'Created Date'];
  ELEMENT_DATA = [];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(public orderService: OrderService, public authService: AuthService) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    if (this.authService.currentUser.userType === 'admin') {
      this.orderService.getAdminOrders(this.authService.currentUser.email).subscribe(res => {
        this.ELEMENT_DATA = res.results;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'AWB': return item.awb;
            case 'Sender Email': return item.sender.email;
            case 'Sender Address': return item.sender.address;
            case 'Created Date': return item.created;
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    } else {
      this.orderService.getClientOrders(this.authService.currentUser.email).subscribe(res => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'AWB': return item.awb;
            case 'Sender Email': return item.sender.email;
            case 'Sender Address': return item.sender.address;
            case 'Created Date': return item.created;
            default: return item[property];
          }
        };
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
  }

  ngAfterViewInit() {
    this.state = 'maximum';
  }
}
