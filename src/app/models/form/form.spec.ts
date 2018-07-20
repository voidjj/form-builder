import { Form, formType } from './form';

describe('Form tests', () => {
  const formId = 10;
  const root = false;
  const parentId = 11;
  const textType: formType = 'text';

  it('should create form with default constructor', () => {
    const form = new Form(formId, root, parentId, textType);
    expect(form.id).toEqual(formId);
    expect(form.root).toEqual(root);
    expect(form.parentId).toEqual(parentId);
    expect(form.type).toMatch(textType);
  });

  it('should create children form with parent id', () => {
    const childrenForm: Form = Form.create(formId, parentId, textType);
    expect(childrenForm.id).toEqual(formId);
    expect(childrenForm.parentId).toEqual(parentId);
    expect(childrenForm.type).toMatch(textType);
  });

  it('should create root form', () => {
    const childrenForm: Form = Form.createRoot(formId);
    expect(childrenForm.id).toEqual(formId);
    expect(childrenForm.root).toBeTruthy();
  });
});
