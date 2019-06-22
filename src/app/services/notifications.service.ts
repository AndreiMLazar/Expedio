import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import openSocket from 'socket.io-client';

const NOTIFICATIONS_URL = environment.apiURL + '/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notifications: Notification[];

  constructor(private http: HttpClient) { }

  getUserNotifications() {
    openSocket('http://localhost:3000');
    const notificationsData = new FormData();
    notificationsData.append('userId', localStorage.getItem('userId'));
    return this.http.post<Notification[]>(NOTIFICATIONS_URL, notificationsData).subscribe(response => {
      this.notifications = response;
    });
  }
}
