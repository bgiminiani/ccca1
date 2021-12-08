import EnrollmentStudentInputData from './EnrollmentStudentInputData';
import EnrollStudent from './EnrollStudent';
import RepositoryAbstractFactoryMemory from './RepositoryAbstractFactoryMemory';

let enrollStudent: EnrollStudent;

beforeEach(() => {
  enrollStudent = new EnrollStudent(new RepositoryAbstractFactoryMemory());
})

test('Não deve matricular aluno com nome inválido', () => {
  const enrollmentStudentInputData = new EnrollmentStudentInputData({
    studentName: 'Ana',
    studentCpf: '111.111.111-11',
    studentBirthDate: '2003-07-06',
    level: 'EM',
    module: '1',
    classroom: 'D',
    installments: 12
  });
  expect(() => enrollStudent.execute(enrollmentStudentInputData)).toThrow(new Error('Invalid name'));
})

test('Não deve matricular aluno com cpf inválido', () => {
  const enrollmentStudentInputData = new EnrollmentStudentInputData({
    studentName: 'Ana Machado',
    studentCpf: '111.111.111-11',
    studentBirthDate: '2003-07-06',
    level: 'EM',
    module: '1',
    classroom: 'D',
    installments: 12
  });
  expect(() => enrollStudent.execute(enrollmentStudentInputData)).toThrow(new Error('Invalid cpf'));
})

test('Não deve matricular aluno duplicado', () => {
  const enrollmentStudentInputData = new EnrollmentStudentInputData({
    studentName: 'Ana Machado',
    studentCpf: '990.721.230-00',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '1',
    classroom: 'A',
    installments: 12
  });
  enrollStudent.execute(enrollmentStudentInputData);
  expect(() => enrollStudent.execute(enrollmentStudentInputData)).toThrow(new Error('Enrollment duplicated student is not allowed'));
})

test('Deve gerar código de matrícula', () => {
  const enrollmentStudentInputData = new EnrollmentStudentInputData({
    studentName: 'Ana Lucia',
    studentCpf: '407.596.890-16',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '1',
    classroom: 'A',
    installments: 12
  });
  const enrollment = enrollStudent.execute(enrollmentStudentInputData);
  expect(enrollment.code.value).toBe('2021EM1A0001');
})

test('Deve gerar código de matrícula e incrementar o sequencial pelo total de matrículas existentes', () => {
  enrollStudent.execute(new EnrollmentStudentInputData({
    studentName: 'Ana Lucia',
    studentCpf: '407.596.890-16',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '1',
    classroom: 'A',
    installments: 12
  }));
  const enrollmentStudentInputData = new EnrollmentStudentInputData({
    studentName: 'Sabrina Alves',
    studentCpf: '372.916.940-86',
    studentBirthDate: '2003-07-06',
    level: 'EM',
    module: '1',
    classroom: 'A',
    installments: 12
  });
  const enrollment = enrollStudent.execute(enrollmentStudentInputData);
  expect(enrollment.code.value).toBe('2021EM1A0002');
})

test('Não deve matricular aluno abaixo da idade mínima', () => {
  const enrollmentStudentInputData = new EnrollmentStudentInputData({
    studentName: 'Ana Silva',
    studentCpf: '407.596.890-16',
    studentBirthDate: '2014-03-12',
    level: 'EM',
    module: '1',
    classroom: 'A',
    installments: 12
  });
  expect(() => enrollStudent.execute(enrollmentStudentInputData)).toThrow('Should not enroll student below minimum age');
}) 

test('Não deve matricular aluno fora da capacidade da turma', () => {
  const enrollmentRequest1 = new EnrollmentStudentInputData({
    studentName: 'Ana Silva',
    studentCpf: '407.596.890-16',
    studentBirthDate: '2002-03-12',
    level: 'EM',
    module: '1',
    classroom: 'D',
    installments: 12
  });
  const enrollmentRequest2 = new EnrollmentStudentInputData({
    studentName: 'Sabrina Alves',
    studentCpf: '372.916.940-86',
    studentBirthDate: '2003-07-06',
    level: 'EM',
    module: '1',
    classroom: 'D',
    installments: 12
  });
  enrollStudent.execute(enrollmentRequest1);
  expect(() => enrollStudent.execute(enrollmentRequest2)).toThrow('Should not enroll student over class capacity');
});

test('Não pode matricular aluno numa turma após o término das aulas', () => {
  const enrollmentStudentInputData = new EnrollmentStudentInputData({
    studentName: 'Sabrina Alves',
    studentCpf: '372.916.940-86',
    studentBirthDate: '2003-07-06',
    level: 'EM',
    module: '1',
    classroom: 'C',
    installments: 12
  });
  expect(() => enrollStudent.execute(enrollmentStudentInputData)).toThrow(new Error('Class is already finished'));
});

test('Não pode matricular aluno numa turma, após ter excedido o tempo em 25% da data de início desta turma', () => {
  const enrollmentStudentInputData = new EnrollmentStudentInputData({
    studentName: 'Sabrina Alves',
    studentCpf: '372.916.940-86',
    studentBirthDate: '2003-07-06',
    level: 'EM',
    module: '1',
    classroom: 'B',
    installments: 12
  });
  expect(() => enrollStudent.execute(enrollmentStudentInputData)).toThrow(new Error('Class time period exceeded 25% of its start date'))
})

test('Deve gerar fatura do aluno matriculado', () => {
  const enrollmentStudentInputData = new EnrollmentStudentInputData({
    studentName: 'Sabrina Alves',
    studentCpf: '372.916.940-86',
    studentBirthDate: '2003-07-06',
    level: 'EM',
    module: '1',
    classroom: 'D',
    installments: 12
  });
  const enrollment = enrollStudent.execute(enrollmentStudentInputData);
  expect(enrollment.invoices).toHaveLength(12);
  expect(enrollment.invoices[0].amount).toBe(1416.66);
  expect(enrollment.invoices[11].amount).toBe(1416.73);
})