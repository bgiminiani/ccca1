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
        },
        {
            level: "EM",
            module: "1",
            code: "B",
            capacity: 2 
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
    const level = this.levels.find(level => level.code === enrollmentRequest.level);
    const module = this.modules.find(module => module.level === enrollmentRequest.level &&
      module.code === enrollmentRequest.module);
    const schoolRoom = this.schoolRoom.find(schoolRoom => schoolRoom.level === enrollmentRequest.level &&
      schoolRoom.module === enrollmentRequest.module &&
      schoolRoom.code === enrollmentRequest.schoolRoom);
    const studentAge = student.getAge();
    if (studentAge < module.minimumAge) throw new Error('Should not enroll student below minimum age');
    const  existingStudentEnrollment = this.enrollments.find(enrollment =>
      enrollment.student.cpf.value === enrollmentRequest.student.cpf);
    if(existingStudentEnrollment) throw new Error('Enrollment duplicated student is not allowed');
    const enrollments = this.enrollments.filter(enrollment => enrollment.level === level.code &&
      enrollment.module === module.code &&
      enrollment.schoolRoom === schoolRoom.code);
    const isOverRoomCapacity = enrollments.length >= schoolRoom.capacity;
    if (isOverRoomCapacity) throw new Error('Should not enroll student over class capacity');
    const fullYear = new Date().getFullYear();
    const sequence = (this.enrollments.length + 1).toString().padStart(4,'0');
    const code = `${fullYear}${level.code}${module.code}${schoolRoom.code}${sequence}`;
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