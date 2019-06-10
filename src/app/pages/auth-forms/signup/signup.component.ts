import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { mimeType } from '../../../../validators/mime-type.validator';
import { AllCountries } from 'src/app/models/all-countries.model';
import { fadeAnimation } from 'src/app/animations/fade-animation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth-forms.component.scss'],
  animations: [fadeAnimation]
})
export class SignupComponent implements OnInit, AfterViewInit {
  state = 'none';
  isLoading = false;
  avatarPreview: string;

  signupForm: FormGroup;
  user = new User();

  allCountries = AllCountries.countriesList;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required] }),
      password: new FormControl('', { validators: [Validators.required] }),
      userType: new FormControl('client', { validators: [Validators.required] }),
      fullName: new FormControl('', { validators: [Validators.required] }),
      telephone: new FormControl('', { validators: [Validators.required] }),
      company: new FormControl('', { validators: [Validators.required] }),
      cui: new FormControl('', { validators: [Validators.required] }),
      country: new FormControl('', { validators: [Validators.required] }),
      address: new FormControl('', { validators: [Validators.minLength(5), Validators.maxLength(80)] }),
      postalCode: new FormControl('', { validators: [Validators.minLength(2), Validators.required] }),
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
      this.signupForm.value.cui,
      this.signupForm.value.country,
      this.signupForm.value.address,
      this.signupForm.value.postalCode,
      this.signupForm.value.avatar
    );

    this.signupForm.reset();
  }
}
