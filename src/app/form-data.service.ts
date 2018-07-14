import { Injectable , Directive } from '@angular/core';
import { Form } from './models/form/form';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private lastId: number = 0;
  private forms: Form[] = [];

  constructor() { }

  getNextId():number {
    this.lastId++;
    return this.lastId;
  }

  create(newForm: Form) {
    if(newForm.id = -1) {
      newForm.id = this.getNextId();
    }
    this.forms.push(newForm);
  }

  createSubFormOn(parentForm: Form){
    let subForm: Form = Form.createNew();
    subForm.id = this.getNextId();

    parentForm.children.push(subForm);
  }

  getForms(): Form[] {
    return this.forms;
  }

  getParentById(id: number):Form {
    let parent: Form = this.findParentById(this.forms,id)
    return parent;
  }

  getParentTypeById(id: number):string {
    let parent: Form = this.findParentById(this.forms,id)
    return parent.type;
  }

findParentById(forms: Form[], id:number):Form {
  let selectedForm: Form;
  _.forEach(forms,(form: Form) => {
      if(this.hasChildrenWithId(form,id)) {
        selectedForm = form;
        return false;
      }
      if(form.children.length>0) {
        selectedForm = this.findParentById(form.children,id);
        if(selectedForm){
          return false;
        }
      }
    });
  return selectedForm;
  }

  hasChildrenWithId(form: Form, id:number):boolean {
    let result: boolean = false;
    if (form.children.length == 0)     {
      return false;
    }
    _.forEach(form.children,(child: Form) => {
        if(child.id == id) {
        result = true;
        return false;
      }
    })
    return result;
  }

  getFormById(id:number):Form {
    let form: Form = this.findFormById(this.forms,id);
    return form
  }

  findFormById(forms: Form[], id:number):Form {
    let selectedForm: Form;
    _.forEach(forms,(form: Form) => {
        if(form.id==id) {
          form;
          return false;
        }
        if(form.children.length>0) {
          selectedForm = this.findFormById(form.children,id);
          if(selectedForm){
            return false;
          }
        }
      });
    return selectedForm;
    }
}
