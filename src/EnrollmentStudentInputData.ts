export default class EnrollmentStudentInputData {
  studentName: string;
  studentCpf: string;
  studentBirthDate: string;
  level: string;
  module: string;
  classroom: string;
  installments: number;
  constructor({
    studentName,
    studentCpf,
    studentBirthDate,
    level,
    module,
    classroom,
    installments,
    }: {
    studentName: string,
    studentCpf: string,
    studentBirthDate: string,
    level: string,
    module: string,
    classroom: string,
    installments: number,
  }) {
    this.studentName = studentName;
    this.studentCpf = studentCpf;
    this.studentBirthDate = studentBirthDate;
    this.level = level;
    this.module = module;
    this.classroom = classroom;
    this.installments = installments;
  }
}