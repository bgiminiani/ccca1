import Cpf from './Cpf';
export default class EnrollStudent {
  enrollments: any[];

  constructor() {
    this.enrollments = [];
  }


  execute(enrollmentRequest: any) {
    if(!(/^([A-Za-z]+ )+([A-Za-z])+$/).test(enrollmentRequest.student.name)) {
      throw new Error('Invalid name');
    }
    const cpf = new Cpf(enrollmentRequest.student.cpf);
    const  existingStudentEnrollment = this.enrollments.find(enrollment =>
      enrollment.student.cpf === enrollmentRequest.student.cpf);
      if(existingStudentEnrollment) throw new Error('Enrollment duplicated student is not allowed');
    const enrollmentStudent = {
      student: {
        cpf: cpf.value,
        name: enrollmentRequest.student.name,
      }
    }
    this.enrollments.push(enrollmentStudent);
  }
}