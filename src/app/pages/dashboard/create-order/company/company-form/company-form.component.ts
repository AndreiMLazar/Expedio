import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { CountriesList } from 'src/app/models/lists/countries-list';
import { PackagesList } from 'src/app/models/lists/package-list';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { CompanyFormModel } from 'src/app/models/company-form/company-form.model';
import { TransportDetails } from 'src/app/models/company-form/transport.model';
import { CompanySender } from 'src/app/models/company-form/company-sender.model';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  isLoading = false;
  companyForm: FormGroup;
  companyFormModel = new CompanyFormModel();
  allCountries = CountriesList.countriesList;
  allPackageModes = PackagesList.modes;

  constructor(public authService: AuthService,
              public orderService: OrderService) { }

  ngOnInit() {
    this.companyForm = new FormGroup({
      transportDate: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      fromAddress: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      fromCountry: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      toAddress: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      toCountry: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      trucks: new FormArray([]),
      instructions: new FormControl('', {
        updateOn: 'blur'
      })
    });
    this.addTruck();
    this.addTruck();
  }

  addTruck() {
    const trucks = this.companyForm.controls.trucks as FormArray;
    trucks.push(new FormGroup({
      truckType: new FormControl(''),
      truckAvailablePallets: new FormControl('')
    }));
  }

  removeTruck(index: number) {
    const trucks = this.companyForm.controls.trucks as FormArray;
    trucks.removeAt(index);
  }

  onCompanyForm() {
    if (this.companyForm.invalid) {
      // return;
    }
    this.isLoading = true;

    for (let i = 0; i < this.companyForm.value.trucks.length; i++) {
      if (this.companyForm.value.trucks[i].truckAvailablePallets === '') {
        this.companyForm.value.trucks.splice(i, 1);
      }
    }

    this.companyFormModel.createdDate = new Date(Date.now());
    this.companyFormModel.instructions = this.companyForm.value.instructions;
    this.companyFormModel.sender = new CompanySender();
    this.companyFormModel.sender.address = this.authService.currentUser.address;
    this.companyFormModel.sender.company = this.authService.currentUser.company;
    this.companyFormModel.sender.country = this.authService.currentUser.country;
    this.companyFormModel.sender.cui = this.authService.currentUser.cui;
    this.companyFormModel.sender.email = this.authService.currentUser.email;
    this.companyFormModel.transportDetails = new TransportDetails();
    this.companyFormModel.transportDetails.transportDate = this.companyForm.value.transportDate;
    this.companyFormModel.transportDetails.fromAddress = this.companyForm.value.fromAddress;
    this.companyFormModel.transportDetails.fromCountry = this.companyForm.value.fromCountry;
    this.companyFormModel.transportDetails.toAddress = this.companyForm.value.toAddress;
    this.companyFormModel.transportDetails.toCountry = this.companyForm.value.toCountry;
    this.companyFormModel.trucks = this.companyForm.value.trucks;
    this.orderService.createCompanyOrder(this.companyFormModel);

    this.companyForm.controls.trucks.updateValueAndValidity();
    this.isLoading = false;
  }

}
