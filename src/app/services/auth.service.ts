import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignupData } from '../interfaces/signup-data';
import { Router } from '@angular/router';

const AUTH_URL = environment.apiURL + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn() {
    return false;
  }

  constructor(private http: HttpClient, private router: Router) { }

  createUser(email: string, password: string, fullName: string, userType: string,
             telephone: string, company: string, address: string, avatar: File) {
    const signupData = new FormData();
    signupData.append('email', email);
    signupData.append('password', password);
    signupData.append('fullName', fullName);
    signupData.append('userType', userType);
    signupData.append('telephone', telephone);
    signupData.append('company', company);
    signupData.append('address', address);
    signupData.append('avatar', avatar);

    console.table(signupData);

    return this.http.post(AUTH_URL + '/signup', signupData).subscribe(response => {
      console.log(response);
      this.router.navigate(['/']);
    });
  }
}
