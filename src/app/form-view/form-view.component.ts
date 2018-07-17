import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable }        from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Form } from '../models/form/form';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})

export class FormViewComponent implements OnInit {
  @Input() form: Form;

  @Output() removeForm: EventEmitter<Form> = new EventEmitter<Form>();

  numberConditions = [
    {name: 'Equals', value: 'equals'},
    {name: 'Greater than', value: 'greater_than'},
    {name: 'Less than', value: 'less_than'}
  ];

  formTypes = [
    {name: 'Text', value: 'text'},
    {name: 'Number', value: 'number'},
    {name: 'Yes / No', value: 'boolean'},
  ];

  logicConditions = [
    {name: 'Equals', value: 'equals'}
  ];

  logicResponses = [
    {name: 'Yes', value: 'true'},
    {name: 'No', value: 'false'},
  ];

  formViewGroup: FormGroup;

  isLoading:boolean = false;
  childrenForm: Observable<Form[]>


  constructor(private fb: FormBuilder, private formDataService: FormDataService) {
  }

  ngOnInit() {
    this.formViewGroup = this.fb.group({
      questionControl: this.form.question || '',
      typeControl:  this.form.type || [this.formTypes[1]],
      conditionControl:   this.form.condition || [this.numberConditions[0]],
      responseControl:  this.form.response || '',
    });

    this.formViewGroup.valueChanges.subscribe((f)=>{

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

  getChildrenForm(){
    this.childrenForm = this.formDataService.getFormsOfParent(this.form)
      .pipe(finalize(()=> this.isLoading = false));
  }

  deleteForm() {
    this.removeForm.emit(this.form);
  }

  onRemoveForm(form: Form) {

    this.formDataService.removeForm(form);
    this.getChildrenForm();
  }

  getParentType():String{
    let parentForm:Form = this.formDataService.getParentOf(this.form);
    return parentForm.type;
  }


}
