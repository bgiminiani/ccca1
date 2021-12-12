import EnrollmentRepository from "../repository/EnrollmentRepository";
import GetEnrollmentOutputData from "../usecase/dto/GetEnrollmentOutputData";
import RepositoryAbstractFactory from "../factory/RepositoryAbstractFactory";

export default class GetEnrollment {
  enrollmentRepository: EnrollmentRepository;

  constructor(repositoryFactory: RepositoryAbstractFactory) {
    this.enrollmentRepository = repositoryFactory.createEnrollmentRepository();
  }

  execute(code: string): GetEnrollmentOutputData {
    const enrollment = this.enrollmentRepository.findByCode(code);
    if(!enrollment) throw new Error('Enrollment not found')
    const balance = enrollment?.getInvoiceBalance();
    const getEnrollmentOutputData = new GetEnrollmentOutputData({
      code: enrollment.code.value,
      balance,
      status: enrollment.status
    })
    return getEnrollmentOutputData;
  }
}