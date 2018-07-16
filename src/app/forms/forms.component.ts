import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Observable }        from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Form } from '../models/form/form';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  providers: [FormDataService]
})

export class FormsComponent implements OnInit {

  constructor(private formDataService: FormDataService) { }

  //forms$: Form[];

  ngOnInit() {
    this.formDataService.createRootForm();
    this.getForms();
  }

  isLoading:boolean = false;
  forms: Observable<Form[]>

  getForms() {
    this.forms = this.formDataService.getRootForms()
      .pipe(finalize(()=> this.isLoading = false));
  }

  createForm() {
    this.formDataService.createRootForm();
    this.getForms();
  }

  onRemoveForm(form: Form) {
    console.log('onRemoveForm');
    this.formDataService.removeForm(form);
    this.getForms();
  }
}
