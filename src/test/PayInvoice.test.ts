import EnrollmentStudentInputData from '../domain/usecase/dto/EnrollmentStudentInputData';
import EnrollStudent from '../domain/usecase/EnrollStudent';
import GetEnrollment from '../domain/usecase/GetEnrollment';
import PayInvoice from '../domain/usecase/PayInvoice';
import RepositoryAbstractFactoryMemory from '../adapter/factory/RepositoryAbstractFactoryMemory';

let enrollStudent: EnrollStudent;
let getEnrollment: GetEnrollment;
let payInvoice: PayInvoice;

beforeEach(() => {
  const repositoryAbstractFactoryMemory = new RepositoryAbstractFactoryMemory()
  enrollStudent = new EnrollStudent(repositoryAbstractFactoryMemory);
  getEnrollment = new GetEnrollment(repositoryAbstractFactoryMemory);
  payInvoice = new PayInvoice(repositoryAbstractFactoryMemory);
})

test('Deve pagar uma fatura', () => {
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
  payInvoice.execute('2021EM1D0001', 1, 2021, 1416.66)
  const getEnrollmentOutputData = getEnrollment.execute('2021EM1D0001');
  expect(getEnrollmentOutputData.code).toBe('2021EM1D0001');
  expect(getEnrollmentOutputData.balance).toBe(15583.33);
})