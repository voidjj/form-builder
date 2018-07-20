import { browser } from 'protractor';
import { FormsPage } from './forms.po';

describe('forms tests', () => {
  let page: FormsPage;

  beforeEach(() => {
    page = new FormsPage();
    browser.get('/');
  });

  it('should display one empty form at starting', () => {
    const count = page.getFormsCount();
    expect(count).toEqual(1);
  });

  it('should add root form by add button', () => {
    page.addRootFormByButtonClick();
    const count = page.getFormsCount();
    expect(count).toEqual(2);
  });

  it('should remove root form by delete button', () => {
    page.addRootFormByButtonClick();
    page.deleteFormByButtonClickAt(0);
    const count = page.getFormsCount();
    expect(count).toEqual(1);
  });
});
