import Enrollment from "../entity/Enrollment";

export default interface EnrollmentRepository {
  save(enrollmentStudent: any): void;
  findAllByClassroom(level: string, module: string, classroom: string): Enrollment[];
  findByCpf(cpf: string): Enrollment | undefined;
  count(): number;
  findByCode(code: string): Enrollment | undefined;
}