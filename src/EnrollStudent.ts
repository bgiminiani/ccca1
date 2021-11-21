export default class EnrollStudent {
  constructor() {

  }

  execute(enrollmentRequest: any) {
    if(!(/^([A-Za-z]+ )+([A-Za-z])+$/).test(enrollmentRequest.student.name)) {
      throw new Error('Invalid name');
    }
  }
}