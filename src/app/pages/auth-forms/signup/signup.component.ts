import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { User } from 'src/app/models/user';
import { mimeType } from '../../../../validators/mime-type.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth-forms.component.scss'],
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
export class SignupComponent implements OnInit, AfterViewInit {
  state = 'none';
  isLoading = false;
  avatarPreview: string;

  signupForm: FormGroup;
  user = new User();

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] }),
      userType: new FormControl('client', { validators: [Validators.required] }),
      fullName: new FormControl('', { validators: [Validators.required] }),
      telephone: new FormControl('', { validators: [Validators.required] }),
      company: new FormControl(''),
      address: new FormControl('', { validators: [Validators.minLength(5), Validators.maxLength(80)] }),
      avatar: new FormControl('', { asyncValidators: [mimeType] })
    });
  }

  ngAfterViewInit() {
    this.state = 'maximum';
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.signupForm.patchValue({ avatar: file });
    this.signupForm.get('avatar').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  onSignup() {
    if (this.signupForm.invalid) {
      // return;
    }
    this.isLoading = true;

    this.authService.createUser(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.fullName,
      this.signupForm.value.userType,
      this.signupForm.value.telephone,
      this.signupForm.value.company,
      this.signupForm.value.address,
      this.signupForm.value.avatar
    );

    this.signupForm.reset();
  }
}
