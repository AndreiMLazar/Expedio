import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CountriesList } from 'src/app/models/lists/countries-list';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.scss']
})
export class AgentFormComponent implements OnInit {
  isLoading = false;
  senderInfo: FormGroup;
  companyDetails: FormGroup;
  packages: FormGroup;
  allCountries = CountriesList.countriesList;

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

    });
  }

}
