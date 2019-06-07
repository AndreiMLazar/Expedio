import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth-forms.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(400, keyframes([
          style({opacity: 0, transform: 'translateY(5%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(400, keyframes([
          style({opacity: 0, transform: 'translateY(5%)', offset: 0}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ])
    ])
  ],
})
export class LoginComponent implements OnInit, AfterViewInit {
  state = 'none';
  isLoading = false;

  constructor() { }

  onLogin(form: NgForm) {
    console.log(form.value);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
      this.state = 'maximum';
  }
}
