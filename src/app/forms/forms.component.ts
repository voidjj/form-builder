import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Form } from '../models/form/form';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  providers: [FormDataService]
})

export class FormsComponent implements OnInit {
  forms: Form[];

  constructor(private formDataService: FormDataService) { }
  ngOnInit() {
    this.formDataService.createRootForm();
    this.getForms();
  }

  getForms() {
    this.forms = this.formDataService.getRootForms();
  }

  createForm() {
    this.formDataService.createRootForm();
    this.getForms();
  }

  onRemoveForm(form: Form) {
    this.formDataService.removeForm(form);
    this.getForms();
  }

  loadFromBrowser() {
    this.formDataService.loadFromStorage();
    this.getForms();
  }

  saveInBrowser() {
    this.formDataService.saveInStorage();
  }
}
