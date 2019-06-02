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

  static fromJs(apiObject: any): Master {
    return {
      ...new Master(),
      ...apiObject,
    };
  }
}

export class Course extends DefaultObject {
  lengthExam: number;
  commun: string;
  name: string;
  nmbGroupTd: number;
  nmbAmphiHour: number;
  nmbTdHour: number;
  nmbEcts: number;
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

  static fromJs(apiObject: any): Course {
    return {
      ...new Course(),
      ...apiObject,
    };
  }
}

const reduceWithProperty = <K extends object>(array: K[], key: keyof K): number =>
  // @ts-ignore needed since the object value can be another thing than a number..
  array.reduce((prev, curr) => (curr[key] || 0) + prev, 0);

export class Module extends DefaultObject {
  name: string;
  courses: Course[] = [];

  get totalEtu(): number {
    return reduceWithProperty(this.courses, 'totalEtu');
  }

  get ects(): number {
    return reduceWithProperty(this.courses, 'nmbEcts');
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

  static fromJs(apiObject: any): Module {
    const ret = new Module();
    ret.id = apiObject._id;
    ret.courses = apiObject.courses.map(Course.fromJs);
    ret.name = apiObject.name;
    return ret;
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

  static fromJs(apiObject: any): Semester {
    const ret = new Semester();
    ret._id = apiObject._id;
    ret.number = apiObject.number;
    ret.modules = apiObject.modules.map(Module.fromJs);
    return ret;
  }
}

export class ItemExtra extends DefaultObject {
  hour: number;
  name: string;
  date: string;

  static fromJs(apiObject: any): ItemExtra {
    return {
      ...new ItemExtra(),
      ...apiObject,
    };
  }
}

export class ExtraModules extends DefaultObject {
  items: ItemExtra[] = [];
  name: string;

  get totalHour(): number {
    return reduceWithProperty(this.items, 'hour');
  }

  static fromJs(apiObject: any): ExtraModules {
    const ret = new ExtraModules();
    ret._id = apiObject._id;
    ret.name = apiObject.name;
    ret.items = apiObject.items.map(ItemExtra.fromJs);
    return ret;
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

  static fromJs(apiObject: any): Year {
    const ret = new Year();
    ret._id = apiObject._id;
    ret.semesters = apiObject.semesters.map(Semester.fromJs);
    ret.extras = apiObject.extras.map(ExtraModules.fromJs);
    return ret;
  }
}

export class Maquette extends DefaultObject {
  inProduction: boolean;
  schoolYear: string;
  years: Year[];
  master: Master;

  static fromJs(apiObject: any): Maquette {
    const ret = new Maquette();
    ret.id = apiObject._id;
    ret.schoolYear = apiObject.schoolYear;
    ret.master = Master.fromJs(apiObject.master);
    ret.years = apiObject.years.map(Year.fromJs);
    ret.inProduction = apiObject.inProduction;
    return ret;
  }
}
