abstract class DefaultObject {
  _id: string;

  // needed since id might not be there
  get id(): string {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }
  // _v: string;
}

export class Master extends DefaultObject {
  maquettes: string[];
  name: string;
  description: string;
}

export class Course extends DefaultObject {
  lengthExam: number;
  commun: string;
  name: string;
  nmbGroupTd: number;
  nmbAmphiHour: number;
  nmbTdHour: number;
  coefCC: number;
  coefExam: number;
  examType: string;
  courseEnglish: boolean;
  englishTranslation: string;
  ratrappage: boolean;

  get totalProf(): number {
    return (this.nmbGroupTd || 0) * (this.nmbTdHour || 0) + (this.nmbAmphiHour || 0);
  }

  get totalEtu(): number {
    return (this.nmbTdHour || 0) + (this.nmbAmphiHour || 0);
  }
}

const reduceWithProperty = <K extends object>(array: K[], key: keyof K): number =>
  // @ts-ignore needed since the object value can be another thing than a number..
  array.reduce((prev, curr) => (curr[key] || 0) + prev, 0);

export class Module extends DefaultObject {
  name: string;
  ects: number;
  courses: Course[] = [];

  get totalEtu(): number {
    return reduceWithProperty(this.courses, 'totalEtu');
  }

  get totalTD(): number {
    return reduceWithProperty(this.courses, 'nmbTdHour');
    return this.courses.reduce((prev, curr) => curr.nmbTdHour + prev, 0);
  }

  get totalAmphi(): number {
    return reduceWithProperty(this.courses, 'nmbAmphiHour');
  }

  get totalExam(): number {
    return reduceWithProperty(this.courses, 'lengthExam');
  }
}

export class Semester extends DefaultObject {
  number: number;
  modules: Module[];

  get totalEtu(): number {
    return reduceWithProperty(this.modules, 'totalEtu');
    return this.modules.reduce((prev, curr) => (curr.totalEtu || 0) + prev, 0);
  }

  get totalTD(): number {
    return reduceWithProperty(this.modules, 'totalTD');
    return this.modules.reduce((prev, curr) => (curr.totalTD || 0) + prev, 0);
  }

  get ects(): number {
    return reduceWithProperty(this.modules, 'ects');
  }

  get totalAmphi(): number {
    return reduceWithProperty(this.modules, 'totalAmphi');
  }

  get totalExam(): number {
    return reduceWithProperty(this.modules, 'totalExam');
  }
}

export class ItemExtra extends DefaultObject {
  hour: number;
  name: string;
  date: string;
}

export class ExtraModules extends DefaultObject {
  items: ItemExtra[] = [];
  name: string;

  get totalHour(): number {
    return reduceWithProperty(this.items, 'hour');
  }
}

export class Year extends DefaultObject {
  level: string;
  semesters: Semester[] = [];
  extras: ExtraModules[] = [];

  get totalHour(): number {
    return (
      reduceWithProperty(this.extras, 'totalHour') +
      reduceWithProperty(this.semesters, 'totalEtu') +
      reduceWithProperty(this.semesters, 'totalExam')
    );
  }
}

export class Maquette extends DefaultObject {
  readonly inProduction: boolean;
  schoolYear: boolean;
  years: Year[];
  master: Master;
}
