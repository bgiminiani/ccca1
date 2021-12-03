import Student from "./Student"

export default class Enrollment {
  student: Student;
  code: string;
  level: string;
  module: string;
  classroom: string;

  constructor(student: Student, code: string, level: string, module: string, classroom: string) {
    this.student = student;
    this.code = code;
    this.level = level;
    this.module = module;
    this.classroom = classroom;
  }
}