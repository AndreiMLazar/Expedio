import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const AUTH_URL = environment.apiURL + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
