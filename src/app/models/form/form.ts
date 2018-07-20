export type formType = 'text' | 'number' | 'boolean';

export class Form {
  id: number;
  type: formType;
  question: string;
  root: boolean;
  parentId: number;
  condition: string;
  response: string;

  constructor(id: number, root: boolean, parentId: number, type: formType) {
    this.id = id;
    this.question = '';
    this.root = root;
    this.parentId = parentId;
    this.type = type;
  }

  public static createRoot(id: number): Form {
    return new Form(id, true, undefined, undefined);
  }

  public static create(id: number, parentId: number, type: formType): Form {
    return new Form(id, false, parentId, type);
  }
}
