import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientFormModel } from '../models/client-form.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const ORDERS_URL = environment.apiURL + '/orders';
const CLIENTS_URL = ORDERS_URL + '/client';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router) { }

  createClientOrder(clientFormModel: ClientFormModel) {
    return this.http.post(CLIENTS_URL + '/create', clientFormModel).subscribe(() => {
      this.router.navigate(['dashboard/my-orders']);
    });
  }

  getClientOrders(email: string) {
    return this.http.get<ClientFormModel[]>(CLIENTS_URL + '/all/' + email);
  }

  getClientOrder(awb: string) {
    return this.http.get<ClientFormModel>(CLIENTS_URL + '/get/' + awb);
  }
}
