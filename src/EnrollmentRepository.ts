export default interface EnrollmentRepository {
  save(enrollmentStudent: any): void;
  findAllByClassroom(level: string, module: string, classroom: string): any;
  findByCpf(cpf: string): any;
  count(): number;
}