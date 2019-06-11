import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesList } from 'src/app/models/lists/countries-list';
import { AuthService } from 'src/app/services/auth.service';
import { ClientFormModel } from 'src/app/models/client-form.model';
import { PackagesList } from 'src/app/models/lists/package-list';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  public depositOpeningTime: Date;
  isLoading = false;
  avatarPreview: string;
  clientForm: FormGroup;
  clientFormModel = new ClientFormModel();
  allCountries = CountriesList.countriesList;
  allPackageModes = PackagesList.modes;
  step = 0;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.clientForm = new FormGroup({
      clientFullName: new FormControl(this.authService.currentUser.fullName, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      clientCNP: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(13), Validators.maxLength(13)],
        updateOn: 'blur'
      }),
      clientAddress: new FormControl(this.authService.currentUser.address, {
        validators: [Validators.minLength(5), Validators.maxLength(80)],
        updateOn: 'blur'
      }),
      clientCountry: new FormControl(this.authService.currentUser.country, {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      recipientFullName: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      recipientCNP: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(13), Validators.maxLength(13)],
        updateOn: 'blur'
      }),
      recipientAddress: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      recipientCountry: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      loadingAddress: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      loadingCountry: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      loadingDate: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$')],
        updateOn: 'blur'
      }),
      depositName: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      depositAddress: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      depositCountry: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      packageMode: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      packageType: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      packageWeight: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      packageVolume: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
    });
  }

  onClientForm() {
    if (this.clientForm.invalid) {
      // return;
    }
    this.isLoading = true;

    console.log(this.clientForm.value);

    this.isLoading = false;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
