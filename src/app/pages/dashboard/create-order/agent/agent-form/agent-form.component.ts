import { AgentTransport } from './../../../../../models/agent-form/agent-transport.model';
import { OrderService } from './../../../../../services/order.service';
import { AgentRecipient } from './../../../../../models/agent-form/agent-recipient.model';
import { AgentFormModel } from './../../../../../models/agent-form/agent-form.model';
import { AgentSender } from './../../../../../models/agent-form/agent-sender.model';
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
  recipientInfo: FormGroup;
  companyDetails: FormGroup;
  packages: FormGroup;
  additionalInformation: FormGroup;
  agentFormModel = new AgentFormModel();
  allCountries = CountriesList.countriesList;
  allPackageModes = PackagesList.modes;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.senderInfo = new FormGroup({
      senderEmail: new FormControl('', { validators: [Validators.required, Validators.email] }),
      senderName: new FormControl('', { validators: [Validators.required] }),
      senderCNP: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(13), Validators.maxLength(13)],
        updateOn: 'blur'
      }),
      senderTelephone: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)] }),
      senderCompanyName: new FormControl('', { validators: [Validators.required] }),
      senderCompanyCUI: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(7)] }),
      senderAddress: new FormControl('', { validators: [Validators.minLength(5), Validators.maxLength(80)] }),
      senderCountry: new FormControl('', { validators: [Validators.required] }),
      senderPostalCode: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] })
    });

    this.recipientInfo = new FormGroup({
      recipientName: new FormControl('', { validators: [Validators.required] }),
      recipientEmail: new FormControl('', { validators: [Validators.required, Validators.email] }),
      // tslint:disable-next-line: max-line-length
      recipientCNP: new FormControl('', {
        validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(13), Validators.maxLength(13)],
        updateOn: 'blur'
      }),
      // tslint:disable-next-line: max-line-length
      recipientTelephone: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)] }),
      recipientAddress: new FormControl('', { validators: [Validators.minLength(5), Validators.maxLength(80)] }),
      recipientCountry: new FormControl('', { validators: [Validators.required] }),
      recipientPostalCode: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] })
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

    this.additionalInformation = new FormGroup({
      instructions: new FormControl('')
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

  submit() {
    if (this.companyDetails.invalid || this.senderInfo.invalid || this.recipientInfo.invalid || this.packages.invalid) {
      return;
    }
    this.isLoading = true;

    this.agentFormModel.sender = new AgentSender();
    this.agentFormModel.recipient = new AgentRecipient();
    this.agentFormModel.transport = new AgentTransport();
    this.agentFormModel.createdDate = new Date(Date.now());
    this.agentFormModel.instructions = this.additionalInformation.value.instructions;

    this.agentFormModel.sender.email = this.senderInfo.value.senderEmail;
    this.agentFormModel.sender.fullName = this.senderInfo.value.senderName;
    this.agentFormModel.sender.cnp = this.senderInfo.value.senderCNP;
    this.agentFormModel.sender.telephone = this.senderInfo.value.senderTelephone;
    this.agentFormModel.sender.companyName = this.senderInfo.value.senderCompanyName;
    this.agentFormModel.sender.companyCUI = this.senderInfo.value.senderCompanyCUI;
    this.agentFormModel.sender.address = this.senderInfo.value.senderAddress;
    this.agentFormModel.sender.country = this.senderInfo.value.senderCountry;
    this.agentFormModel.sender.postalCode = this.senderInfo.value.senderPostalCode;

    this.agentFormModel.recipient.email = this.recipientInfo.value.recipientEmail;
    this.agentFormModel.recipient.fullName = this.recipientInfo.value.recipientName;
    this.agentFormModel.recipient.cnp = this.recipientInfo.value.recipientCNP;
    this.agentFormModel.recipient.country = this.recipientInfo.value.recipientCountry;
    this.agentFormModel.recipient.address = this.recipientInfo.value.recipientAddress;
    this.agentFormModel.recipient.telephone = this.recipientInfo.value.recipientTelephone;

    this.agentFormModel.transport.name = this.companyDetails.value.companyName;
    this.agentFormModel.transport.email = this.companyDetails.value.companyEmail;
    this.agentFormModel.transport.telephone = this.companyDetails.value.companyTelephone;
    this.agentFormModel.transport.cui = this.companyDetails.value.companyCUI;
    this.agentFormModel.transport.address = this.companyDetails.value.companyAddress;
    this.agentFormModel.transport.country = this.companyDetails.value.companyCountry;
    this.agentFormModel.transport.postalCode = this.companyDetails.value.companyPostalCode;

    for (let i = 0; i < this.packages.value.packages.length; i++) {
      if (this.packages.value.packages[i].packageType === '') {
        this.packages.value.packages.splice(i, 1);
      }
    }

    console.log(this.agentFormModel);

    this.agentFormModel.packagesList = this.packages.value.packages;
    this.orderService.createAgentOrder(this.agentFormModel);

    this.packages.controls.packages.updateValueAndValidity();
    this.isLoading = false;
  }
}
