import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import * as openSocket from 'socket.io-client';

const NOTIFICATIONS_URL = environment.apiURL + '/notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notifications: Notification[] = [];
  socket: any;

  constructor(private http: HttpClient) { }

  getUserNotifications() {
    if (!this.socket) {
      this.socket = openSocket(environment.host);

      this.socket.on('newNotifications', (data: Notification) => {
        this.notifications.push(data);
      });
    } else {
      this.socket.on('disconnect', data => {
        this.socket.disconnect();
      });
    }
    // const notificationsData = new FormData();
    // notificationsData.append('userId', localStorage.getItem('userId'));

    // return this.http.post<Notification[]>(NOTIFICATIONS_URL, notificationsData).subscribe(response => {
    //   this.notifications = response;
    // });
  }
}
