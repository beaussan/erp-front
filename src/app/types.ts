interface DefaultObject {
  _id: string;
  id: string;
}

/*
{
  "roles": [
    "USER_ROLE"
  ],
  "_id": "5cf3d9f93839b7199778af1a",
  "password": "$argon2id$v=19$m=4096,t=3,p=1$cZwAcleOJrPT3UrBCRDPfA$9lO+e7/BxA/KOEkTqDSa9rOfZbJ8Oh2SKE+OgCjNSc8",
  "email": "foo@bar.fr",
  "lastName": "bar",
  "firstName": "foo",
  "__v": 0
}
 */

export interface User extends DefaultObject {
  roles: string[];
  email: string;
  lastName: string;
  firstName: string;
}

export interface Master extends DefaultObject {
  maquettes: string[];
  name: string;
  description: string;
}

export interface Course extends DefaultObject {
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
}

export const CourseHelpers = {
  totalProf: (course: Course): number =>
    (this.nmbGroupTd || 0) * (this.nmbTdHour || 0) + (this.nmbAmphiHour || 0),
  totalEtu: (course: Course): number => (this.nmbTdHour || 0) + (this.nmbAmphiHour || 0),
};

const reduceWithProperty = <K extends object>(array: K[], call: (K) => number): number =>
  // @ts-ignore needed since the object value can be another thing than a number..
  array.reduce((prev, curr) => (curr[key] || 0) + prev, 0);

export interface Module extends DefaultObject {
  name: string;
  courses: Course[];
}

export const ModuleHelpers = {
  hasCourse: (module: Module, id: string): boolean => !!module.courses.find(c => c.id === id),
  totalEtu: (module: Module): number => reduceWithProperty(module.courses, CourseHelpers.totalEtu),
  ects: (module: Module): number => reduceWithProperty(module.courses, course => course.nmbEcts),
  totalTD: (module: Module): number =>
    reduceWithProperty(module.courses, course => course.nmbTdHour),
  totalAmphi: (module: Module): number =>
    reduceWithProperty(module.courses, course => course.nmbAmphiHour),
  totalExam: (module: Module): number =>
    reduceWithProperty(module.courses, course => course.lengthExam),
};

export interface Semester extends DefaultObject {
  number: number;
  modules: Module[];
}
// this.modules.reduce((prev, curr) => prev ? prev : curr.hasCourse(id), false);
export const SemesterHelpers = {
  hasCourse: (semester: Semester, id: string): boolean =>
    semester.modules.reduce(
      (prev, curr) => (prev ? prev : ModuleHelpers.hasCourse(curr, id)),
      false,
    ),
  totalEtu: (semester: Semester): number =>
    reduceWithProperty(semester.modules, ModuleHelpers.totalEtu),
  ects: (semester: Semester): number => reduceWithProperty(semester.modules, ModuleHelpers.ects),
  totalTD: (semester: Semester): number =>
    reduceWithProperty(semester.modules, ModuleHelpers.totalTD),
  totalAmphi: (semester: Semester): number =>
    reduceWithProperty(semester.modules, ModuleHelpers.totalAmphi),
  totalExam: (semester: Semester): number =>
    reduceWithProperty(semester.modules, ModuleHelpers.totalExam),
};

export interface ItemExtra extends DefaultObject {
  hour: number;
  name: string;
  date: string;
}

export interface ExtraModules extends DefaultObject {
  items: ItemExtra[];
  name: string;
}

export const ExtraModuleHelpers = {
  totalHour: (module: ExtraModules): number => reduceWithProperty(module.items, item => item.hour),
};

export interface Year extends DefaultObject {
  level: string;
  semesters: Semester[];
  extras: ExtraModules[];
}

export const YearHelpers = {
  hasCourse: (year: Year, id: string): boolean =>
    year.semesters.reduce(
      (prev, curr) => (prev ? prev : SemesterHelpers.hasCourse(curr, id)),
      false,
    ),
  totalHour: (year: Year): number =>
    reduceWithProperty(year.extras, ExtraModuleHelpers.totalHour) +
    reduceWithProperty(year.semesters, SemesterHelpers.totalEtu) +
    reduceWithProperty(year.semesters, SemesterHelpers.totalExam),
};

export interface Maquette extends DefaultObject {
  inProduction: boolean;
  schoolYear: string;
  years: Year[];
  master: Master;
}

export const MaquetteHelpers = {
  hasCourse: (maquette: Maquette, id: string) =>
    maquette.years.reduce((prev, curr) => (prev ? prev : YearHelpers.hasCourse(curr, id)), false),
};
