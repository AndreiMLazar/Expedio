import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientFormModel } from 'src/app/models/client-form/client-form.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CompanyFormModel } from '../models/company-form/company-form.model';

const ORDERS_URL = environment.apiURL + '/orders';
const CLIENT_URL = ORDERS_URL + '/client';
const COMPANY_URL = ORDERS_URL + '/company';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router) { }

  createClientOrder(clientFormModel: ClientFormModel) {
    return this.http.post(CLIENT_URL + '/create', clientFormModel).subscribe(() => {
      this.router.navigate(['dashboard/my-orders']);
    });
  }

  createCompanyOrder(companyFormModel: CompanyFormModel) {
    return this.http.post(COMPANY_URL + '/create', companyFormModel).subscribe(() => {
      this.router.navigate(['dashboard/my-orders']);
    });
  }

  getClientOrders(email: string) {
    return this.http.get<ClientFormModel[]>(CLIENT_URL + '/all/' + email);
  }

  getCompanyOrders(email: string) {
    return this.http.get<CompanyFormModel[]>(COMPANY_URL + '/all/' + email);
  }

  getClientOrder(awb: string) {
    return this.http.get<ClientFormModel>(CLIENT_URL + '/get/' + awb);
  }
}
