import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesList } from 'src/app/models/lists/countries-list';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { PackagesList } from 'src/app/models/lists/package-list';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class AgentFormComponent implements OnInit {
  isLoading = false;
  senderInfo: FormGroup;
  companyDetails: FormGroup;
  packages: FormGroup;
  allCountries = CountriesList.countriesList;
  allPackageModes = PackagesList.modes;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.senderInfo = new FormGroup({
      senderName: new FormControl('', { validators: [Validators.required] }),
      senderEmail: new FormControl('', { validators: [Validators.required, Validators.email] }),
      senderTelephone: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)] }),
      senderCompanyName: new FormControl('', { validators: [Validators.required] }),
      senderCUI: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(7)] }),
      senderAddress: new FormControl('', { validators: [Validators.minLength(5), Validators.maxLength(80)] }),
      senderCountry: new FormControl('', { validators: [Validators.required] }),
      senderPostalCode: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] })
    });

    this.companyDetails = new FormGroup({
      companyName: new FormControl('', { validators: [Validators.required] }),
      companyEmail: new FormControl('', { validators: [Validators.required, Validators.email] }),
      companyTelephone: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)] }),
      companyCUI: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(7)] }),
      companyAddress: new FormControl('', { validators: [Validators.minLength(5), Validators.maxLength(80)] }),
      companyCountry: new FormControl('', { validators: [Validators.required] }),
      companyPostalCode: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] })
    });

    this.packages = new FormGroup({
      packages: new FormArray([])
    });

    this.addPackage();
    this.addPackage();
  }

  addPackage() {
    const packages = this.packages.controls.packages as FormArray;
    packages.push(new FormGroup({
      packageMode: new FormControl(''),
      packageType: new FormControl(''),
      packageWeight: new FormControl(''),
      packageVolume: new FormControl('')
    }));
  }

  removePackage(index: number) {
    const packages = this.packages.controls.packages as FormArray;
    packages.removeAt(index);
  }
}
