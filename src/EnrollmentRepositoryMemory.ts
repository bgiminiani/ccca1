import Enrollment from "./Enrollment";
import EnrollmentRepository from "./EnrollmentRepository";
import Level from "./Level";
import Module from "./Module";

export default class EnrollmentRepositoryMemory implements EnrollmentRepository{
  enrollments: Enrollment[];
  constructor() {
    this.enrollments = []
  }

  save(enrollmentStudent: any): void {
    this.enrollments.push(enrollmentStudent);
  }

  findAllByClassroom(level: string, module: string, classroom: string): Enrollment[] {
    return this.enrollments.filter(enrollment => enrollment.level.getCode() === level &&
      enrollment.module.code === module &&
      enrollment.classroom.code === classroom);
  }

  findByCpf(cpf: string) {
    return this.enrollments.find(enrollment =>
      enrollment.student.cpf.value === cpf);
  }

  count(): number {
    return this.enrollments.length
  }
}