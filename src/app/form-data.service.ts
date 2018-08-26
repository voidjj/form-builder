import { Injectable } from '@angular/core';
import { Form } from './models/form/form';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class FormDataService {
  lastId = 0;
  forms: Form[] = new Array<Form>();

  getNextFormId(): number {
    return this.lastId++;
  }

  getRootForms(): Form[] {
    return _.filter(this.forms, {root: true});
  }

  getFormsOfParent(parentForm: Form): Form[] {
    return _.filter(this.forms, {parentId: parentForm.id});
  }

  createRootForm() {
    const newForm: Form = Form.createRoot(this.getNextFormId());
    this.forms.push(newForm);
  }

  createFormWithParent(parentForm: Form) {
    const newForm: Form = Form.create(this.getNextFormId(), parentForm.id, parentForm.type);
    this.forms.push(newForm);
  }

  getParentOf(form: Form): Form {
    return this.forms.find(f => f.id === form.parentId);
  }

  getFormsWithResponse(form: Form, userResponse: string | number): Form[] {
    const getFormsOfParent: Form[] = this.getFormsOfParent(form);
    if (_.isEmpty(getFormsOfParent)) {
       return [];
    }

    if (form.type === 'text' || form.type === 'boolean') {
      return _.filter(getFormsOfParent, (f: Form) => {
        return f.response === userResponse;
      });
    }

    if (form.type === 'number') {
      const numberResponse = _.toInteger(userResponse);
      return _.filter(getFormsOfParent, (f: Form) => {
        return f.response === numberResponse && f.condition === 'equals' ||
               f.response < userResponse && f.condition === 'greater_than' ||
               f.response > userResponse && f.condition === 'less_than' ;
      });
    }
  }

  removeForm(form: Form) {
    _.remove(this.forms, {id: form.id});
  }

  removeFormWithChildren(form: Form) {
    const children = this.getFormsOfParent(form);
    _.forEach(children, (f: Form) => {
      this.removeFormWithChildren(f);
      this.removeForm(f);
    });
    this.removeForm(form);
  }

  saveInStorage() {
    localStorage.setItem('formbuilder', this.getStringifyForms());
  }

  loadFromStorage() {
    this.forms = JSON.parse(localStorage.getItem('formbuilder'));
  }

  getStringifyForms(): string {
    return  JSON.stringify(this.forms);
  }
}
