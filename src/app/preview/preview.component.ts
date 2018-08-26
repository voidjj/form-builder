import { Component, OnInit } from '@angular/core';
import { Form } from '../models/form/form';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html'
})

export class PreviewComponent implements OnInit {
  forms: Form[];

  constructor(private formDataService: FormDataService) { }
  ngOnInit() {
    this.forms = this.formDataService.getRootForms();
  }
}
