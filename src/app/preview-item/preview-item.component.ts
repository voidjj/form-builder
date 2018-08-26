import { Component, Input,  OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form } from '../models/form/form';
import { FormDataService } from '../form-data.service';
import * as _ from 'lodash';
import * as FormViewHelper from '../form-view-helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preview-item',
  templateUrl: './preview-item.component.html'
})

export class PreviewItemComponent implements OnInit, OnDestroy {
  @Input() form: Form;
  logicResponses: Array<Object> = FormViewHelper.logicResponses;
  childrenForms: Form[];

  formViewGroup: FormGroup;
  formViewGroupSubject: Subscription;
  formResponse: string | number;

  constructor(private fb: FormBuilder, private formDataService: FormDataService) {
  }

  ngOnInit(): void {
    this.formViewGroup = this.fb.group({
      responseControl: this.formResponse
    });
    this.formViewGroupSubject = this.formViewGroup.valueChanges.subscribe(f => {
      this.formResponse = f.responseControl;
      this.getCorrentResponse();
    });
  }

  ngOnDestroy(): void {
    this.formViewGroupSubject.unsubscribe();
  }

  getCorrentResponse(): void {
    this.childrenForms = this.formDataService.getFormsWithResponse(this.form, this.formResponse);
  }
}
