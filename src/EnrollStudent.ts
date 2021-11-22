import Cpf from './Cpf';
import Name from './Name';
export default class EnrollStudent {
  enrollments: any[];

  constructor() {
    this.enrollments = [];
  }


  execute(enrollmentRequest: any) {
    const name = new Name(enrollmentRequest.student.name);
    const cpf = new Cpf(enrollmentRequest.student.cpf);
    const  existingStudentEnrollment = this.enrollments.find(enrollment =>
      enrollment.student.cpf === enrollmentRequest.student.cpf);
      if(existingStudentEnrollment) throw new Error('Enrollment duplicated student is not allowed');
    const enrollmentStudent = {
      student: {
        cpf: cpf.value,
        name: name.value,
      }
    }
    this.enrollments.push(enrollmentStudent);
  }
}