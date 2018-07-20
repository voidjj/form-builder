import { browser, element, by } from 'protractor';

export class FormsPage {

  addRootFormButtonId: string = 'add-root-input-button';
  addSubInputButtonId: string = 'add-sub-input-button';
  deleteButtonId: string = 'delete-button';
  rootFormIds: string = 'root-form';

  constructor() {
  }

  addSubFormByButtonClickAt(n: number) {
    element.all(by.id(this.addRootFormButtonId)).get(n).click();
  }

  addRootFormByButtonClick() {
    element(by.id(this.addRootFormButtonId)).click();
  }

  deleteFormByButtonClickAt(n: number) {
    element.all(by.id(this.deleteButtonId)).get(n).click();
  }

  getFormsCount() {
    const count = element.all(by.id(this.rootFormIds)).count();
    return count;
  }
}
