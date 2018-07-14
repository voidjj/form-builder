import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup  } from '@angular/forms';

import { Form } from '../models/form/form';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})

export class FormViewComponent implements OnInit {

  @Input() form: Form;

  @Output() change: EventEmitter<number> = new EventEmitter<number>();

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {}

  createSubForm() {
    this.formDataService.createSubFormOn(this.form);
    this.reload();
  }

  reload() {
    this.change.emit(this.form.id);
  }

  getParentType(): String {
    let type: string = this.formDataService.getParentTypeById(this.form.id);
    return type;
  }

  deleteForm() {
    //this.formDataService.deleteFormById(this.form.id);
    this.reload();
  }

}
