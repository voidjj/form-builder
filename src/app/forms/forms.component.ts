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
  ngOnInit() {
  }

  formGroup$: Form[];

  createForm() {
    let newForm: Form = Form.createNewRoot();
    this.formDataService.create(newForm);
    this.reloadForms();
  }

  reloadForms() {
    this.formGroup$ = this.formDataService.getForms();
  }

  countChange(event: any){
    this.reloadForms();
  }


}
