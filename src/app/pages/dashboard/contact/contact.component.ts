import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  onContact(form: NgForm) {
    if (form.invalid) {
      return;
    }

    // this.contactService.contact(form.value.subject, form.value.body);
  }

  ngOnInit() {
  }

}
