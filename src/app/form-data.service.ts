import { Injectable , Directive } from '@angular/core';
import { Form } from './models/form/form';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class FormDataService {
  lastId = 0;
  forms: Form[] = new Array<Form>();

  getNextId(): number {
    this.lastId++;
    return this.lastId;
  }

  getRootForms(): Form[] {
    const forms: Form[] = _.filter(this.forms, {root: true});
    return forms;
  }

  getFormsOfParent(parentForm: Form): Form[] {
    const childrenForm: Form[] = _.filter(this.forms, {parentId: parentForm.id});
    return childrenForm;
  }

  createRootForm() {
    const newForm: Form = Form.createRoot(this.getNextId());
    this.forms.push(newForm);
  }

  createFormWithParent(parentForm: Form) {
    const newForm: Form = Form.create(this.getNextId(), parentForm.id, parentForm.type);
    this.forms.push(newForm);
  }

  updageForm(form: Form): Form {
    const oldForm = this.forms.find(f => f.id === form.id);
    const newForm = Object.assign(oldForm, form);
    return newForm;
  }

  getParentOf(form: Form): Form {
    const parentForm = this.forms.find(f => f.id === form.parentId);
    return parentForm;
  }

  removeForm(form: Form) {
    _.remove(this.forms, {id: form.id});
  }

  saveInStorage() {
    localStorage.setItem('formbuilder', JSON.stringify(this.forms));
  }

  loadFromStorage() {
    this.forms = JSON.parse(localStorage.getItem('formbuilder'));
  }
}
