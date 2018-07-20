import { browser, element, by } from 'protractor';

export class FormsPage {

  addRootFormButtonId: string = 'addRootInputButton';
  addSubInputButtonId: string = 'addSubInputButton';
  deleteButtonId: string = 'deleteButton';
  rootFormIds: string = 'rootForm';
  firstRootFormId: string = 'rootForm0';

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

  isFormPresentWithId(id: number) {
    const present = element(by.id(`rootFormIds{$id}`)).isPresent();
    return present;
  }

}
