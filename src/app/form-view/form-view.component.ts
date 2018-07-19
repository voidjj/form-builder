import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Form } from '../models/form/form';
import { FormDataService } from '../form-data.service';
import * as FormViewHelper from './form-view-helper';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html'
})

export class FormViewComponent implements OnInit {
  @Input() form: Form;
  @Output() removeForm: EventEmitter<Form> = new EventEmitter<Form>();
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
    this.formViewGroup.valueChanges.subscribe(f => {
      this.form.question = f.questionControl;
      this.form.type = f.typeControl;
      this.form.condition = f.conditionControl;
      this.form.response = f.responseControl;
    });
    this.applyChildrenForm();
  }

  applyChildrenForm() {
    this.childrenForm = this.formDataService.getFormsOfParent(this.form);
  }

  createSubForm() {
    this.formDataService.createFormWithParent(this.form);
    this.applyChildrenForm();
  }

  deleteSubForm() {
    this.removeForm.emit(this.form);
    this.applyChildrenForm();
  }

  onRemoveEventForm(form: Form) {
    this.formDataService.removeForm(form);
    this.applyChildrenForm();
  }

  getParentType(): String {
    const parentForm: Form = this.formDataService.getParentOf(this.form);
    return parentForm.type;
  }
}
