import { Component, Input, Output, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Form } from '../models/form/form';
import { FormDataService } from '../form-data.service';
import * as FormViewHelper from '../form-view-helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html'
})

export class FormItemComponent implements OnInit, OnDestroy {
  @Input() form: Form;
  @Output() reloadParentForm: EventEmitter<null> = new EventEmitter<null>();
  formViewGroupSubject: Subscription;
  formViewGroup: FormGroup;
  childrenForm: Form[];
  logicResponses: Array<Object> = FormViewHelper.logicResponses;
  numberConditions: Array<Object> = FormViewHelper.numberConditions;
  logicConditions: Array<Object> = FormViewHelper.logicConditions;
  formTypes: Array<Object> = FormViewHelper.formTypes;

  constructor(private fb: FormBuilder, private formDataService: FormDataService) {}

  ngOnInit() {
    this.formViewGroup = this.fb.group({
      questionControl: this.form.question,
      typeControl: this.form.type,
      conditionControl: this.form.condition,
      responseControl: this.form.response
    });
    this.formViewGroupSubject = this.formViewGroup.valueChanges.subscribe(f => {
      this.form.question = f.questionControl;
      this.form.type = f.typeControl;
      this.form.condition = f.conditionControl;
      this.form.response = f.responseControl;
    });
    this.loadChildrenForm();
  }

  ngOnDestroy() {
    this.formViewGroupSubject.unsubscribe();
  }

  loadChildrenForm() {
    this.childrenForm = this.formDataService.getFormsOfParent(this.form);
  }

  createChildForm() {
    this.formDataService.createFormWithParent(this.form);
    this.loadChildrenForm();
  }

  deleteChildForm() {
    this.formDataService.removeFormWithChildren(this.form);
    this.reloadParentForm.emit(null);
  }

  onReloadParentForm() {
    this.loadChildrenForm();
  }

  getParentType(): String {
    return this.formDataService.getParentOf(this.form).type;
  }
}
