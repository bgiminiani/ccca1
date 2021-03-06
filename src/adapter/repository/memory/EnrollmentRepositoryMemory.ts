import Enrollment from "../../../domain/entity/Enrollment";
import EnrollmentRepository from "../../../domain/repository/EnrollmentRepository";

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

  findByCode(code: string): Enrollment | undefined {
    return this.enrollments.find(enrollment => enrollment.code.value === code);
  }

}