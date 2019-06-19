import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { CountriesList } from 'src/app/models/lists/countries-list';
import { AuthService } from 'src/app/services/auth.service';
import { mimeType } from 'src/app/validators/mime-type.validator';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  isLoading = false;
  avatarPreview: string;

  signupForm: FormGroup;
  user = new User();

  allCountries = CountriesList.countriesList;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl({ value: this.authService.currentUser.email, disabled: true }),
      password: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      userType: new FormControl(this.authService.currentUser.userType, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      fullName: new FormControl(this.authService.currentUser.fullName, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      telephone: new FormControl(this.authService.currentUser.telephone, {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)],
        updateOn: 'blur'
      }),
      company: new FormControl(this.authService.currentUser.company, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      cui: new FormControl(this.authService.currentUser.cui, {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(7)],
        updateOn: 'blur'
      }),
      country: new FormControl(this.authService.currentUser.country, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      address: new FormControl(this.authService.currentUser.address, {
        validators: [Validators.minLength(5), Validators.maxLength(80)],
        updateOn: 'blur'
      }),
      postalCode: new FormControl(this.authService.currentUser.postalCode, {
        validators: [Validators.minLength(2), Validators.required],
        updateOn: 'blur'
      }),
      avatar: new FormControl(this.authService.currentUser.avatarPath, {
        asyncValidators: [mimeType],
        updateOn: 'blur'
      })
    });
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

  onUpdate() {
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;

    this.authService.updateUser(
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
  }
}
