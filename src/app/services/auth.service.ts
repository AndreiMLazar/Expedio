import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserLoginData } from '../interfaces/user-login-data.interface';
import { User } from '../models/user.model';
import { CurrentUser } from '../models/current-user.model';

const AUTH_URL = environment.apiURL + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  private currentUser = new CurrentUser();

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  isLoggedIn() {
    return this.isAuthenticated;
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
      this.router.navigate(['/']);
    });
  }

  login(email: string, password: string) {
    const authData: UserLoginData = { email, password };
    this.http
      .post<CurrentUser>(AUTH_URL + '/login', authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.currentUser = response;
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      });
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }
}
