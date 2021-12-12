import EnrollmentStudentInputData from './EnrollmentStudentInputData';
import EnrollStudent from './EnrollStudent';
import GetEnrollment from './GetEnrollment';
import RepositoryAbstractFactoryMemory from './RepositoryAbstractFactoryMemory';

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;

beforeEach(() => {
  const repositoryAbstractFactoryMemory = new RepositoryAbstractFactoryMemory()
  enrollStudent = new EnrollStudent(repositoryAbstractFactoryMemory);
  getEnrollment = new GetEnrollment(repositoryAbstractFactoryMemory);
})

test('Deve recuperar matrícula com o saldo da fatura', () => {
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
  const getEnrollmentOutputData = getEnrollment.execute('2021EM1D0001');
  expect(getEnrollmentOutputData.code).toBe('2021EM1D0001');
  expect(getEnrollmentOutputData.balance).toBe(16999.99);
})