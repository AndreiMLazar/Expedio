import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
