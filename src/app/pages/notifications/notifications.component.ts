import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  public notifications =
    [
      { message: 'dummy', type: 'warning' },
      { message: 'dummy2', type: 'information' },
      { message: 'dummy3', type: 'succeed' }
    ];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.notificationsService.getUserNotifications();
  }

}
