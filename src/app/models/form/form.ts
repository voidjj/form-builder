export class Form {

  id: number = -1;
  root: boolean;
  condition: string = 'equals'
  question: string = '';
  textAnswer: string = '';
  numberAnswer: number;
  booleanAnswer: boolean;

  children: Form[] = [];
  type: string= 'text';

  constructor(root: boolean) {
    this.id = -1;
    this.root = root;
  }

  public static createNew():Form {
    return new Form (undefined);
  }

  public static createNewRoot():Form {
    return new Form (true);
  }

  isRoot():boolean {
    return this.root;
  }

}
