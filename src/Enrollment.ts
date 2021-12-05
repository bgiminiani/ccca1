import Level from "./Level";
import Module from "./Module";
import Classroom from "./Classroom";
import Student from "./Student"
import EnrollmentCode from "./EnrollmentCode";

export default class Enrollment {
  student: Student;
  level: Level;
  module: Module;
  classroom: Classroom;
  issueDate: Date;
  sequence: number;
  code: EnrollmentCode;

  constructor(student: Student, level: Level, module: Module, classroom: Classroom, issueDate: Date, sequence: number) {
    if (student.getAge() < module.minimumAge) throw new Error('Should not enroll student below minimum age');
    if(classroom.isFinished(issueDate)) throw new Error('Class is already finished');
    if(classroom.getProgress(issueDate) > 25) throw new Error('Class time period exceeded 25% of its start date');
    this.student = student;
    this.level = level;
    this.module = module;
    this.classroom = classroom;
    this.issueDate = issueDate;
    this.sequence = sequence;
    this.code = new EnrollmentCode(level.code, module.code, classroom.code, issueDate, sequence);
  }
}