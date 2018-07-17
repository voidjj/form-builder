import { Injectable , Directive } from '@angular/core';
import {Observable, of} from 'rxjs';

import {delay} from 'rxjs/operators'

import { Form } from './models/form/form';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class FormDataService {

  lastId: number = 0;

  forms: Form[] = new Array<Form>();

  delayMs = 1; //only for testing
  getNextId():number {
    this.lastId++;
    return this.lastId;
  }

  getRootForms(): Observable<Form[]> {
    let forms:Form[] = _.filter(this.forms, {root: true});
      console.log("root count: "+forms.length)
    return of(forms).pipe(delay(this.delayMs));
  }

  getFormsOfParent(parentForm: Form): Observable<Form[]> {
    let childrenForm:Form[] = _.filter(this.forms, {parentId: parentForm.id});
    console.log("parentId: "+ parentForm.id);
    console.log("childrenForm count: "+childrenForm.length)
    return of(childrenForm).pipe(delay(this.delayMs));
  }

  createRootForm() {
    let newForm:Form = Form.createRoot(this.getNextId());
    this.forms.push(newForm);
  }

  createFormWithParent(parentForm: Form) {
    let newForm:Form = Form.create(this.getNextId(), parentForm.id);
    console.log("ID: " + newForm.id + " | PID: " + parentForm.id)
    this.forms.push(newForm);
  }

  updageForm(form: Form): Observable<Form> {
    const oldForm = this.forms.find(f => f.id === form.id);
    const newForm = Object.assign(oldForm, form);
    return of(newForm).pipe(delay(this.delayMs));
  }

  getParentOf(form: Form): Form {
    const parentForm = this.forms.find(f => f.parentId === form.id);
    return parentForm
  }

  removeForm(form: Form) {
    _.remove(this.forms,{id: form.id});
  }
}
