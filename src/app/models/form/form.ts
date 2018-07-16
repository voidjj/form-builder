export class Form {

  id: number = -1;
  question: string = 'p1';
  root: boolean;
  parentId: number;

  constructor(id: number, root: boolean, parentId: number) {
    this.id = id;
    this.question = '';
    this.root = root;
    this.parentId = parentId
  }

  public static createRoot(id: number):Form {
    return new Form(id, true, undefined);
  }

  public static create(id: number, parentId: number):Form {
    return new Form(id, false, parentId);
  }

}
