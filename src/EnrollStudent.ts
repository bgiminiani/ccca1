import Student from './Student';

export default class EnrollStudent {
  enrollments: any[];
  levels: any[];
  modules: any[];
  schoolRoom: any[];

  constructor() {
    this.levels = [
      {
          code: "EF1",
          description: "Ensino Fundamental I"
      },
      {
          code: "EF2",
          description: "Ensino Fundamental II"
      },
      {
          code: "EM",
          description: "Ensino Médio"
      }
    ];
    this.modules = [
      {
          level: "EF1",
          code: "1",
          description: "1o Ano",
          minimumAge: 6,
          price: 15000
      },
      {
          level: "EF1",
          code: "2",
          description: "2o Ano",
          minimumAge: 7,
          price: 15000
      },
      {
          level: "EF1",
          code: "3",
          description: "3o Ano",
          minimumAge: 8,
          price: 15000
      },
      {
          level: "EF1",
          code: "4",
          description: "4o Ano",
          minimumAge: 9,
          price: 15000
      },
      {
          level: "EF1",
          code: "5",
          description: "5o Ano",
          minimumAge: 10,
          price: 15000
      },
      {
          level: "EF2",
          code: "6",
          description: "6o Ano",
          minimumAge: 11,
          price: 14000
      },
      {
          level: "EF2",
          code: "7",
          description: "7o Ano",
          minimumAge: 12,
          price: 14000
      },
      {
          level: "EF2",
          code: "8",
          description: "8o Ano",
          minimumAge: 13,
          price: 14000
      },
      {
          level: "EF2",
          code: "9",
          description: "9o Ano",
          minimumAge: 14,
          price: 14000
      },
      {
          level: "EM",
          code: "1",
          description: "1o Ano",
          minimumAge: 15,
          price: 17000
      },
      {
          level: "EM",
          code: "2",
          description: "2o Ano",
          minimumAge: 16,
          price: 17000
      },
      {
          level: "EM",
          code: "3",
          description: "3o Ano",
          minimumAge: 17,
          price: 17000
      }
    ];
    this.schoolRoom = [
        {
            level: "EM",
            module: "1",
            code: "A",
            capacity: 1 
        }
    ];
    this.enrollments = [];
  }

  execute(enrollmentRequest: any) {
    const student = new Student(
      enrollmentRequest.student.name, 
      enrollmentRequest.student.cpf,
      enrollmentRequest.student.birthDate,
    );
    const module = this.modules.find(module => module.level === enrollmentRequest.level &&
      module.code === enrollmentRequest.module);
    const studentAge = student.getAge();
    if (studentAge < module.minimumAge) throw new Error('Should not enroll student below minimum age');
    const  existingStudentEnrollment = this.enrollments.find(enrollment =>
      enrollment.student.cpf.value === enrollmentRequest.student.cpf);
    if(existingStudentEnrollment) throw new Error('Enrollment duplicated student is not allowed');
    const enrollments = this.enrollments.filter(enrollment => enrollment.level === enrollmentRequest.level &&
      enrollment.module === enrollmentRequest.module &&
      enrollment.schoolRoom === enrollmentRequest.schoolRoom);
    const room = this.schoolRoom.find(room => room.level === enrollmentRequest.level &&
      room.module === enrollmentRequest.module &&
      room.code === enrollmentRequest.schoolRoom);
    const isOverRoomCapacity = enrollments.length >= room.capacity;
    if (isOverRoomCapacity) throw new Error('Should not enroll student over class capacity');
    const fullYear = new Date().getFullYear();
    const code = `${fullYear}${enrollmentRequest.level}${enrollmentRequest.module}${enrollmentRequest.schoolRoom}0001`;
    const enrollmentStudent = {
      student,
      code,
      level: enrollmentRequest.level,
      module: enrollmentRequest.module,
      schoolRoom: enrollmentRequest.schoolRoom,
    };
    this.enrollments.push(enrollmentStudent);
    return enrollmentStudent;
  }
}