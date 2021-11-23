import EnrollStudent from './EnrollStudent';

test('Não deve matricular aluno com nome inválido', () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: 'Ana',
    }
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Invalid name'));
})

test('Não deve matricular aluno com cpf inválido', () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: 'Ana Machado',
      cpf: '111.111.111-11',
    }
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Invalid cpf'));
})

test('Não deve matricular aluno duplicado', () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: 'Ana Machado',
      cpf: '990.721.230-00',
      birthDate: '2002-03-12',
    },
    level: 'EM',
    module: '1',
    schoolRoom: 'A',
  };
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Enrollment duplicated student is not allowed'));
})

test('Deve gerar código de matrícula', () => {
  const enrollStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: 'Ana Lucia',
      cpf: '407.596.890-16',
      birthDate: '2002-03-12',
    },
    level: 'EM',
    module: '1',
    schoolRoom: 'A',
  };
  const enrollment = enrollStudent.execute(enrollmentRequest);
  expect(enrollment.code).toBe('2021EM1A0001');
})

test('Não deve matricular aluno abaixo da idade mínima', () => {
  const enrollmentStudent = new EnrollStudent();
  const enrollmentRequest = {
    student: {
      name: 'Ana Silva',
      cpf: '407.596.890-16',
      birthDate: '2014-03-12',
    },
    level: 'EM',
    module: '1',
    schoolRoom: 'A',
  }
  expect(() => enrollmentStudent.execute(enrollmentRequest)).toThrow('Should not enroll student below minimum age');
}) 
