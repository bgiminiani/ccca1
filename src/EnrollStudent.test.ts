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
    }
  };
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Enrollment duplicated student is not allowed'));
})