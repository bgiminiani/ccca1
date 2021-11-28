export default interface EnrollmentRepository {
  save(enrollmentStudent: any): void;
  findAllBySchoolRomm(level: string, module: string, schoolRoom: string): any;
  findByCpf(cpf: string): any;
  count(): number;
}