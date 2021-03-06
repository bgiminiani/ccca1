import EnrollmentRepository from "../repository/EnrollmentRepository";
import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory";

export default class PayInvoice {
  enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(code: string, month: number, year: number, amount: number): any {
    const enrollment = this.enrollmentRepository.findByCode(code);
    if (!enrollment) throw new Error('Enrollment not found');
    enrollment.payInvoice(month, year, amount);
  }
}