import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserLoginData } from '../interfaces/user-login-data.interface';
import { CurrentUser } from '../models/current-user.model';
import { UpdatedUserResponse } from '../models/responses/updated-user-response';

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
  private timeZone = 10800;

  public currentUser = new CurrentUser();

  constructor(private http: HttpClient, private router: Router) { }

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

  createUser(email: string, password: string, fullName: string, userType: string,
             telephone: string, company: string, cui: string, country: string,
             address: string, postalCode: string, avatar: File) {
    const signupData = new FormData();
    signupData.append('email', email);
    signupData.append('password', password);
    signupData.append('fullName', fullName);
    signupData.append('userType', userType);
    signupData.append('telephone', telephone);
    signupData.append('company', company);
    signupData.append('address', address);
    signupData.append('avatar', avatar);
    signupData.append('cui', cui);
    signupData.append('country', country);
    signupData.append('postalCode', postalCode);
    console.table(signupData);

    return this.http.post(AUTH_URL + '/signup', signupData).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  updateUser(password: string, fullName: string, userType: string, telephone: string,
             company: string, cui: string, country: string,
             address: string, postalCode: string) {
    const updateData = new FormData();
    updateData.append('userId', localStorage.getItem('userId'));
    updateData.append('password', password);
    updateData.append('fullName', fullName);
    updateData.append('userType', userType);
    updateData.append('telephone', telephone);
    updateData.append('company', company);
    updateData.append('address', address);
    updateData.append('cui', cui);
    updateData.append('country', country);
    updateData.append('postalCode', postalCode);

    return this.http.post<UpdatedUserResponse>(AUTH_URL + '/update', updateData).subscribe(response => {
      localStorage.setItem('user', JSON.stringify(response.result));
      this.currentUser = response.result;
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
          const expirationDate = new Date(now.getTime() + (expiresInDuration + this.timeZone) * 1000);
          this.saveAuthData(token, expirationDate, this.userId, response);
          this.router.navigate(['/dashboard/overview']);
        }
      });
  }

  updateAvatar(avatar: File) {
    const updateData = new FormData();
    updateData.append('userId', localStorage.getItem('userId'));
    updateData.append('avatar', avatar);
    return this.http.post<UpdatedUserResponse>(AUTH_URL + '/avatar', updateData).subscribe(response => {
      localStorage.setItem('user', JSON.stringify(response.result));
      this.currentUser.avatarPath = response.result.avatarPath;
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime() - this.timeZone * 1000;
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, currentUser) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('user', JSON.stringify(currentUser));
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
    this.currentUser = JSON.parse(localStorage.getItem('user'));

    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    };
  }
}
