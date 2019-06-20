import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { mimeType } from 'src/app/validators/mime-type.validator';
import { User } from 'src/app/models/user.model';
import { CountriesList } from 'src/app/models/lists/countries-list';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateAgentComponent implements OnInit {
  isLinear = false;
  isLoading = false;
  userBasicInfo: FormGroup;
  userDetails: FormGroup;
  userCompany: FormGroup;

  user = new User();
  allCountries = CountriesList.countriesList;
  avatarPreview: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    this.userDetails.patchValue({ avatar: file });
    this.userDetails.get('avatar').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  submit() {
    if (this.userBasicInfo.invalid || this.userDetails.invalid || this.userCompany.invalid) {
      // return;
    }
    this.isLoading = true;

    this.authService.createUser(
      this.userBasicInfo.value.userEmail,
      this.userBasicInfo.value.userPassword,
      this.userDetails.value.userFullName,
      this.userBasicInfo.value.userType,
      this.userDetails.value.userTelephone,
      this.userCompany.value.userCompanyName,
      this.userCompany.value.userCUI,
      this.userCompany.value.userCountry,
      this.userCompany.value.userAddress,
      this.userCompany.value.userPostalCode,
      this.userDetails.value.avatar
    );

    this.userBasicInfo.reset();
    this.userDetails.reset();
    this.userCompany.reset();
    this.isLoading = false;
  }


  ngOnInit() {
    this.userBasicInfo = this.formBuilder.group({
      userType: new FormControl('agent', { validators: [Validators.required] }),
      userEmail: new FormControl('', { validators: [Validators.required, Validators.email] }),
      userPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
    });
    this.userDetails = this.formBuilder.group({
      userFullName: new FormControl('', { validators: [Validators.required] }),
      userTelephone: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)] }),
      avatar: new FormControl('', { asyncValidators: [mimeType], updateOn: 'blur' })
    });
    this.userCompany = this.formBuilder.group({
      userCompanyName: new FormControl('', { validators: [Validators.required] }),
      userCUI: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(7)] }),
      userCountry: new FormControl('', { validators: [Validators.required] }),
      userPostalCode: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
      userAddress: new FormControl('', { validators: [Validators.minLength(5), Validators.maxLength(80)] }),
    });
  }

}
