import EnrollmentRepository from "../repository/EnrollmentRepository";
import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory";

export default class CancelEnrollment {
  enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(code: string): void {
    const enrollment = this.enrollmentRepository.findByCode(code);
    if (!enrollment) throw new Error('Enrollment not found');
    enrollment.status = 'cancelled';
  }
}