import EnrollmentRepositoryMemory from './EnrollmentRepositoryMemory';
import EnrollStudent from './EnrollStudent';
import LevelRepositoryMemory from './LevelRepositoryMemory';
import ModuleRepositoryMemory from './ModuleRepositoryMemory';
import ClassroomRepositoryMemory from './ClassroomRepositoryMemory';

let enrollStudent: EnrollStudent;

beforeEach(() => {
  const enrollmentRepository = new EnrollmentRepositoryMemory();
  const levelRepository = new LevelRepositoryMemory();
  const moduleRepository = new ModuleRepositoryMemory();
  const classroomRepository = new ClassroomRepositoryMemory();
  enrollStudent = new EnrollStudent(
    levelRepository, 
    moduleRepository,
    classroomRepository,
    enrollmentRepository);
})

test('Não deve matricular aluno com nome inválido', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana',
    }
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Invalid name'));
})

test('Não deve matricular aluno com cpf inválido', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana Machado',
      cpf: '111.111.111-11',
    }
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Invalid cpf'));
})

test('Não deve matricular aluno duplicado', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana Machado',
      cpf: '990.721.230-00',
      birthDate: '2002-03-12',
    },
    level: 'EM',
    module: '1',
    classroom: 'A',
  };
  enrollStudent.execute(enrollmentRequest);
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Enrollment duplicated student is not allowed'));
})

test('Deve gerar código de matrícula', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana Lucia',
      cpf: '407.596.890-16',
      birthDate: '2002-03-12',
    },
    level: 'EM',
    module: '1',
    classroom: 'A',
  };
  const enrollment = enrollStudent.execute(enrollmentRequest);
  expect(enrollment.code.value).toBe('2021EM1A0001');
})

test('Deve gerar código de matrícula e incrementar o sequencial pelo total de matrículas existentes', () => {
  enrollStudent.execute({
    student: {
      name: 'Ana Lucia',
      cpf: '407.596.890-16',
      birthDate: '2002-03-12',
    },
    level: 'EM',
    module: '1',
    classroom: 'A',
  });
  const enrollmentRequest = {
    student: {
      name: 'Sabrina Alves',
      cpf: '372.916.940-86',
      birthDate: '2003-07-06',
    },
    level: 'EM',
    module: '1',
    classroom: 'A',
  }
  const enrollment = enrollStudent.execute(enrollmentRequest);
  expect(enrollment.code.value).toBe('2021EM1A0002');
})

test('Não deve matricular aluno abaixo da idade mínima', () => {
  const enrollmentRequest = {
    student: {
      name: 'Ana Silva',
      cpf: '407.596.890-16',
      birthDate: '2014-03-12',
    },
    level: 'EM',
    module: '1',
    classroom: 'A',
  };
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow('Should not enroll student below minimum age');
}) 

test('Não deve matricular aluno fora da capacidade da turma', () => {
  const enrollmentRequest1 = {
    student: {
      name: 'Ana Silva',
      cpf: '407.596.890-16',
      birthDate: '2002-03-12',
    },
    level: 'EM',
    module: '1',
    classroom: 'D',
  };
  const enrollmentRequest2 = {
    student: {
      name: 'Sabrina Alves',
      cpf: '372.916.940-86',
      birthDate: '2003-07-06',
    },
    level: 'EM',
    module: '1',
    classroom: 'D',
  }
  enrollStudent.execute(enrollmentRequest1);
  expect(() => enrollStudent.execute(enrollmentRequest2)).toThrow('Should not enroll student over class capacity');
});

test('Não pode matricular aluno numa turma após o término das aulas', () => {
  const enrollmentRequest = {
    student: {
      name: 'Sabrina Alves',
      cpf: '372.916.940-86',
      birthDate: '2003-07-06',
    },
    level: 'EM',
    module: '1',
    classroom: 'C',
  }
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Class is already finished'));
});

test('Não pode matricular aluno numa turma, após ter excedido o tempo em 25% da data de início desta turma', () => {
  const enrollmentRequest = {
    student: {
      name: 'Sabrina Alves',
      cpf: '372.916.940-86',
      birthDate: '2003-07-06',
    },
    level: 'EM',
    module: '1',
    classroom: 'B',
  }
  expect(() => enrollStudent.execute(enrollmentRequest)).toThrow(new Error('Class time period exceeded 25% of its start date'))
})

test.only('Deve gerar fatura do aluno matriculado', () => {
  const enrollmentRequest = {
    student: {
      name: 'Sabrina Alves',
      cpf: '372.916.940-86',
      birthDate: '2003-07-06',
    },
    level: 'EM',
    module: '1',
    classroom: 'D',
    installments: 12
  }
  const enrollment = enrollStudent.execute(enrollmentRequest);
  expect(enrollment.invoices).toHaveLength(12);
  expect(enrollment.invoices[0].amount).toBe(1416.66);
  expect(enrollment.invoices[11].amount).toBe(1416.73);
})