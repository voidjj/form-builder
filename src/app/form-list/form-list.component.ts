import { Component, OnInit } from '@angular/core';
import { Form } from '../models/form/form';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-forms',
  templateUrl: './form-list.component.html'
})

export class FormListComponent implements OnInit {
  forms: Form[];

  constructor(private formDataService: FormDataService) { }
  ngOnInit() {
    this.loadForms();
  }

  loadForms() {
    this.forms = this.formDataService.getRootForms();
  }

  createRootForm() {
    this.formDataService.createRootForm();
    this.loadForms();
  }

  onReloadFormsRoot(form: Form) {
    this.loadForms();
  }

  loadFromBrowser() {
    this.formDataService.loadFromStorage();
    this.loadForms();
  }

  saveInBrowser() {
    this.formDataService.saveInStorage();
  }
}
