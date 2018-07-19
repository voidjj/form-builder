export class Form {
  id = -1;
  question: string;
  root: boolean;
  parentId: number;
  type: string;
  condition: string;
  response: string;

  constructor(id: number, root: boolean, parentId: number, type: string) {
    this.id = id;
    this.question = '';
    this.root = root;
    this.parentId = parentId;
    this.type = type;
  }

  public static createRoot(id: number): Form {
    return new Form(id, true, undefined, undefined);
  }

  public static create(id: number, parentId: number, type: string): Form {
    return new Form(id, false, parentId, type);
  }
}

export const formTypes: any = [
  {name: 'Text', value: 'text'},
  {name: 'Number', value: 'number'},
  {name: 'Yes / No', value: 'boolean'},
];

export const logicResponses = [
  {name: 'Yes', value: 'true'},
  {name: 'No', value: 'false'},
];

export const numberConditions: any = [
  {name: 'Equals', value: 'equals'},
  {name: 'Greater than', value: 'greater_than'},
  {name: 'Less than', value: 'less_than'}
];

export const logicConditions: any = [
  {name: 'Equals', value: 'equals'}
];
