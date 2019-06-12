import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ClientFormModel } from '../models/client-form.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const COMMANDS_URL = environment.apiURL + '/commands';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private http: HttpClient, private router: Router) { }

  createClientCommand(clientFormModel: ClientFormModel) {
    const updateData = new FormData();
    updateData.append('address', clientFormModel.address);
    console.log(clientFormModel);
    console.log(updateData);
    return this.http.post(COMMANDS_URL + '/client/create', clientFormModel).subscribe(() => {
      this.router.navigate(['/commands']);
    });
  }
}
