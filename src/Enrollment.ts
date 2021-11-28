import Student from "./Student"

export default class Enrollment {
  student: Student;
  code: string;
  level: string;
  module: string;
  schoolRoom: string;

  constructor(student: Student, code: string, level: string, module: string, schoolRoom: string) {
    this.student = student;
    this.code = code;
    this.level = level;
    this.module = module;
    this.schoolRoom = schoolRoom;
  }
}