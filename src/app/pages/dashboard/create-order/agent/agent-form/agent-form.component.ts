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
import { User } from 'src/app/models/user.model';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

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
  filteredSenders: User[] = [];
  filteredRecipients: User[] = [];
  filteredCompanies: User[] = [];

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
      senderEmail: new FormControl('', { validators: [Validators.required] }),
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
      recipientEmail: new FormControl('', { validators: [Validators.required] }),
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
      companyEmail: new FormControl('', { validators: [Validators.required] }),
      companyTelephone: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(8)] }),
      companyCUI: new FormControl('', { validators: [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(7)] }),
      companyAddress: new FormControl('', { validators: [Validators.minLength(5), Validators.maxLength(80)] }),
      companyCountry: new FormControl('', { validators: [Validators.required] })
    });

    this.packages = new FormGroup({
      packages: new FormArray([])
    });

    this.additionalInformation = new FormGroup({
      instructions: new FormControl('')
    });

    this.getListOfUsers('senderEmail', this.senderInfo, this.filteredSenders);
    this.getListOfUsers('recipientEmail', this.recipientInfo, this.filteredRecipients);
    this.getListOfUsers('companyEmail', this.companyDetails, this.filteredCompanies);

    this.addPackage();
    this.addPackage();
  }

  getListOfUsers(formField: string, formGroup: FormGroup, filteredField: User[]) {
    formGroup
      .get(formField)
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(email => this.authService.searchUser(email)
          .pipe(finalize(() => this.isLoading = false))
        )
      )
      .subscribe((users: User[]) => {
        if (filteredField === this.filteredSenders) {
          this.filteredSenders = users;
        } else if (filteredField === this.filteredRecipients) {
          this.filteredRecipients = users;
        } else if (filteredField === this.filteredCompanies) {
          this.filteredCompanies = users;
        }
      });
  }

  displayUser(user: User) {
    if (user) { return user.email; }
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
    this.agentFormModel.creator = this.authService.currentUser.email;

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
    this.agentFormModel.recipient.postalCode = this.recipientInfo.value.recipientPostalCode;

    this.agentFormModel.transport.name = this.companyDetails.value.companyName;
    this.agentFormModel.transport.email = this.companyDetails.value.companyEmail;
    this.agentFormModel.transport.telephone = this.companyDetails.value.companyTelephone;
    this.agentFormModel.transport.cui = this.companyDetails.value.companyCUI;
    this.agentFormModel.transport.address = this.companyDetails.value.companyAddress;
    this.agentFormModel.transport.country = this.companyDetails.value.companyCountry;

    for (let i = 0; i < this.packages.value.packages.length; i++) {
      if (this.packages.value.packages[i].packageType === '') {
        this.packages.value.packages.splice(i, 1);
      }
    }

    this.agentFormModel.packagesList = this.packages.value.packages;
    this.orderService.createAgentOrder(this.agentFormModel);

    this.packages.controls.packages.updateValueAndValidity();
    this.isLoading = false;
  }

  populateSender(email: string) {
    this.senderInfo.controls.senderAddress.setValue(this.filteredSenders[0].address);
    this.senderInfo.controls.senderCNP.setValue(this.filteredSenders[0].cnp);
    this.senderInfo.controls.senderCompanyCUI.setValue(this.filteredSenders[0].cui);
    this.senderInfo.controls.senderCompanyName.setValue(this.filteredSenders[0].company);
    this.senderInfo.controls.senderCountry.setValue(this.filteredSenders[0].country);
    this.senderInfo.controls.senderEmail.setValue(email);
    this.senderInfo.controls.senderEmail.updateValueAndValidity();
    this.senderInfo.controls.senderName.setValue(this.filteredSenders[0].fullName);
    this.senderInfo.controls.senderPostalCode.setValue(this.filteredSenders[0].postalCode);
    this.senderInfo.controls.senderTelephone.setValue(this.filteredSenders[0].telephone);
  }

  populateRecipient(email: string) {
    this.recipientInfo.controls.recipientAddress.setValue(this.filteredRecipients[0].address);
    this.recipientInfo.controls.recipientCNP.setValue(this.filteredRecipients[0].cnp);
    this.recipientInfo.controls.recipientCountry.setValue(this.filteredRecipients[0].country);
    this.recipientInfo.controls.recipientEmail.setValue(email);
    this.recipientInfo.controls.recipientEmail.updateValueAndValidity();
    this.recipientInfo.controls.recipientName.setValue(this.filteredRecipients[0].fullName);
    this.recipientInfo.controls.recipientTelephone.setValue(this.filteredRecipients[0].telephone);
    this.recipientInfo.controls.recipientPostalCode.setValue(this.filteredRecipients[0].postalCode);
  }

  populateCompany(email: string) {
    this.companyDetails.controls.companyAddress.setValue(this.filteredCompanies[0].address);
    this.companyDetails.controls.companyCUI.setValue(this.filteredCompanies[0].cui);
    this.companyDetails.controls.companyCountry.setValue(this.filteredCompanies[0].country);
    this.companyDetails.controls.companyEmail.setValue(email);
    this.companyDetails.controls.companyEmail.updateValueAndValidity();
    this.companyDetails.controls.companyName.setValue(this.filteredCompanies[0].fullName);
    this.companyDetails.controls.companyTelephone.setValue(this.filteredCompanies[0].telephone);
    this.companyDetails.controls.companyPostalCode.setValue(this.filteredCompanies[0].postalCode);
  }
}
