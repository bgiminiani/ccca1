import EnrollmentRepository from "./EnrollmentRepository";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository{
  enrollments: any[];
  constructor() {
    this.enrollments = []
  }

  save(enrollmentStudent: any): void {
    this.enrollments.push(enrollmentStudent);
  }

  findAllBySchoolRomm(level: string, module: string, schoolRoom: string) {
    return this.enrollments.filter(enrollment => enrollment.level === level &&
      enrollment.module === module &&
      enrollment.schoolRoom === schoolRoom);
  }

  findByCpf(cpf: string) {
    return this.enrollments.find(enrollment =>
      enrollment.student.cpf.value === cpf);
  }

  count(): number {
    return this.enrollments.length
  }
}