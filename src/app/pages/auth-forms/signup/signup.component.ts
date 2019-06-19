import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { mimeType } from '../../../validators/mime-type.validator';
import { CountriesList } from 'src/app/models/lists/countries-list';
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

  allCountries = CountriesList.countriesList;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
        updateOn: 'blur'
      }),
      userType: new FormControl('client', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      fullName: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      telephone: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)],
        updateOn: 'blur'
      }),
      company: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      cui: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(7)],
        updateOn: 'blur'
      }),
      country: new FormControl('Romania', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      address: new FormControl('', {
        validators: [Validators.minLength(5), Validators.maxLength(80)],
        updateOn: 'blur'
      }),
      postalCode: new FormControl('', {
        validators: [Validators.minLength(2), Validators.required],
        updateOn: 'blur'
      }),
      avatar: new FormControl('', {
        asyncValidators: [mimeType],
        updateOn: 'blur'
      })
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
      return;
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

    this.isLoading = false;
    this.signupForm.reset();
  }
}
