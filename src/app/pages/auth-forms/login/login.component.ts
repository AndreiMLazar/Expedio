import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { fadeAnimation } from 'src/app/animations/fade-animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth-forms.component.scss'],
  animations: [fadeAnimation]
})
export class LoginComponent implements OnInit, AfterViewInit {
  state = 'none';
  isLoading = false;

  constructor(public authService: AuthService) { }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.state = 'maximum';
  }
}
