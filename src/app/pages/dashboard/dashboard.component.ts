import { Component, OnInit, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        animate(400, keyframes([
          style({ opacity: 0, transform: 'translateY(5%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),
      transition('* => void', [
        animate(400, keyframes([
          style({ opacity: 0, transform: 'translateY(5%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ])
    ])
  ],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  state = 'none';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.state = 'maximum';
  }
}
