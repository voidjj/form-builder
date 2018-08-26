import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html'
})

export class ExportComponent implements OnInit {
  formsAsString: string;

  constructor(private formDataService: FormDataService) { }

  ngOnInit() {
    this.formsAsString = this.formDataService.getStringifyForms();
  }

}
