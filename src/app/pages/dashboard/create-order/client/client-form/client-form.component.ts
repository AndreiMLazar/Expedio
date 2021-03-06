import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CountriesList } from 'src/app/models/lists/countries-list';
import { AuthService } from 'src/app/services/auth.service';
import { ClientFormModel } from 'src/app/models/client-form/client-form.model';
import { PackagesList } from 'src/app/models/lists/package-list';
import { OrderService } from 'src/app/services/order.service';
import { ClientSender } from 'src/app/models/client-form/client-sender.model';
import { Recipient } from 'src/app/models/client-form/client-recipient.model';
import { LoadingPlace } from 'src/app/models/client-form/loading-place.model';
import { Deposit } from 'src/app/models/client-form/deposit.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  isLoading = false;
  clientForm: FormGroup;
  clientFormModel = new ClientFormModel();
  allCountries = CountriesList.countriesList;
  allPackageModes = PackagesList.modes;

  constructor(public authService: AuthService,
              public orderService: OrderService) { }

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
        validators: [Validators.required],
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
      packages: new FormArray([]),
      instructions: new FormControl('', {
        updateOn: 'blur'
      })
    });
    this.addPackage();
    this.addPackage();
  }

  addPackage() {
    const packages = this.clientForm.controls.packages as FormArray;
    packages.push(new FormGroup({
      packageMode: new FormControl(''),
      packageType: new FormControl(''),
      packageWeight: new FormControl(''),
      packageVolume: new FormControl('')
    }));
  }

  removePackage(index: number) {
    const packages = this.clientForm.controls.packages as FormArray;
    packages.removeAt(index);
  }

  onClientForm() {
    if (this.clientForm.invalid) {
      // return;
    }
    this.isLoading = true;

    this.clientFormModel.createdDate = new Date(Date.now());
    this.clientFormModel.sender = new ClientSender();
    this.clientFormModel.sender.email = this.authService.currentUser.email;
    this.clientFormModel.sender.fullName = this.clientForm.value.clientFullName;
    this.clientFormModel.sender.address = this.clientForm.value.clientAddress;
    this.clientFormModel.sender.country = this.clientForm.value.clientCountry;
    this.clientFormModel.sender.cnp = this.clientForm.value.clientCNP;
    this.clientFormModel.sender.instructions = this.clientForm.value.instructions;
    this.clientFormModel.recipient = new Recipient();
    this.clientFormModel.recipient.address = this.clientForm.value.recipientAddress;
    this.clientFormModel.recipient.cnp = this.clientForm.value.recipientCNP;
    this.clientFormModel.recipient.country = this.clientForm.value.recipientCountry;
    this.clientFormModel.recipient.fullName = this.clientForm.value.recipientFullName;
    this.clientFormModel.loadingPlace = new LoadingPlace();
    this.clientFormModel.loadingPlace.address = this.clientForm.value.loadingAddress;
    this.clientFormModel.loadingPlace.country = this.clientForm.value.loadingCountry;
    this.clientFormModel.loadingPlace.date = this.clientForm.value.loadingDate;
    this.clientFormModel.deposit = new Deposit();
    this.clientFormModel.deposit.address = this.clientForm.value.depositAddress;
    this.clientFormModel.deposit.name = this.clientForm.value.depositName;
    this.clientFormModel.deposit.country = this.clientForm.value.depositCountry;

    for (let i = 0; i < this.clientForm.value.packages.length; i++) {
      if (this.clientForm.value.packages[i].packageType === '') {
        this.clientForm.value.packages.splice(i, 1);
      }
    }

    this.clientFormModel.packagesList = this.clientForm.value.packages;
    this.orderService.createClientOrder(this.clientFormModel);

    this.clientForm.controls.packages.updateValueAndValidity();
    this.isLoading = false;
  }
}
