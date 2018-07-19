import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Form } from '../models/form/form';
import { FormDataService } from '../form-data.service';
import { logicResponses } from '../models/form/form';
import { numberConditions } from '../models/form/form';
import { formTypes } from '../models/form/form';
import { logicConditions } from '../models/form/form';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html'
})

export class FormViewComponent implements OnInit {
  @Input() form: Form;
  @Output() removeForm: EventEmitter<Form> = new EventEmitter<Form>();

  formViewGroup: FormGroup;
  isLoading: boolean = false;
  childrenForm: Form[];

  constructor(private fb: FormBuilder, private formDataService: FormDataService) {}

  ngOnInit() {
    this.formViewGroup = this.fb.group({
      questionControl: this.form.question || '',
      typeControl: this.form.type || [formTypes[0]],
      conditionControl: this.form.condition || [numberConditions[0]],
      responseControl: this.form.response || ''
    });

    this.formViewGroup.valueChanges.subscribe(f => {
      this.form.question = f.questionControl;
      this.form.type = f.typeControl;
      this.form.condition = f.conditionControl;
      this.form.response = f.responseControl;
    });
  }

  createForm() {
    this.formDataService.createFormWithParent(this.form);
    this.getChildrenForm();
  }

  getChildrenForm() {
    this.childrenForm = this.formDataService.getFormsOfParent(this.form);
  }

  deleteForm() {
    this.removeForm.emit(this.form);
  }

  onRemoveForm(form: Form) {
    this.formDataService.removeForm(form);
    this.getChildrenForm();
  }

  getParentType(): String {
    const parentForm: Form = this.formDataService.getParentOf(this.form);
    return parentForm.type;
  }
}
