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