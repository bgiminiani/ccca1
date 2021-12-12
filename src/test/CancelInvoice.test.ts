import CancelEnrollment from '../domain/usecase/CancelEnrollment';
import EnrollmentStudentInputData from '../domain/usecase/dto/EnrollmentStudentInputData';
import EnrollStudent from '../domain/usecase/EnrollStudent';
import GetEnrollment from '../domain/usecase/GetEnrollment';
import RepositoryAbstractFactoryMemory from '../adapter/factory/RepositoryAbstractFactoryMemory';

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let cancelEnrollment: CancelEnrollment;

beforeEach(() => {
  const repositoryAbstractFactoryMemory = new RepositoryAbstractFactoryMemory()
  enrollStudent = new EnrollStudent(repositoryAbstractFactoryMemory);
  getEnrollment = new GetEnrollment(repositoryAbstractFactoryMemory);
  cancelEnrollment = new CancelEnrollment(repositoryAbstractFactoryMemory)
})

test('Deve cancelar uma fatura', () => {
  const enrollmentStudentInputData = new EnrollmentStudentInputData({
    studentName: 'Sabrina Alves',
    studentCpf: '372.916.940-86',
    studentBirthDate: '2003-07-06',
    level: 'EM',
    module: '1',
    classroom: 'D',
    installments: 12
  });
  enrollStudent.execute(enrollmentStudentInputData);
  cancelEnrollment.execute('2021EM1D0001');
  const getEnrollmentOutputData = getEnrollment.execute('2021EM1D0001');
  expect(getEnrollmentOutputData.status).toBe('cancelled');
})