import Cpf from './Cpf';
import Name from './Name';
import Student from './Student';
export default class EnrollStudent {
  enrollments: any[];

  constructor() {
    this.enrollments = [];
  }


  execute(enrollmentRequest: any) {
    const student = new Student(
      enrollmentRequest.student.name, 
      enrollmentRequest.student.cpf
    );
    const  existingStudentEnrollment = this.enrollments.find(enrollment =>
      enrollment.student.cpf.value === enrollmentRequest.student.cpf);
    if(existingStudentEnrollment) throw new Error('Enrollment duplicated student is not allowed');
    const enrollmentStudent = {
      student,
    };
    this.enrollments.push(enrollmentStudent);
  }
}