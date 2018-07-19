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
    this.applyForms();
  }

  applyForms() {
    this.forms = this.formDataService.getRootForms();
  }

  createRootForm() {
    this.formDataService.createRootForm();
    this.applyForms();
  }

  onRemoveForm(form: Form) {
    this.formDataService.removeForm(form);
    this.applyForms();
  }

  loadFromBrowser() {
    this.formDataService.loadFromStorage();
    this.applyForms();
  }

  saveInBrowser() {
    this.formDataService.saveInStorage();
  }
}
