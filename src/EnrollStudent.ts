export default class EnrollStudent {
  enrollments: any[];

  constructor() {
    this.enrollments = [];
  }

  validateCpf(cpf = "") {
    const FACTOR_DIGIT_1 = 10;
    const FACTOR_DIGIT_2 = 11;
    const MAX_DIGITS_1 = 9;
    const MAX_DIGITS_2 = 10;
    cpf = this.extractDigits(cpf);
    if (this.isInvalidLength(cpf)) return false;
    if (this.isBlocked(cpf)) return false;
    const digit1 = this.calculateDigit(cpf, FACTOR_DIGIT_1, MAX_DIGITS_1);
    const digit2 = this.calculateDigit(cpf, FACTOR_DIGIT_2, MAX_DIGITS_2);
    let calculatedCheckDigit = `${digit1}${digit2}`;  
    return this.getCheckDigit(cpf) == calculatedCheckDigit;
  }

  extractDigits(cpf: string) {
      return cpf.replace(/\D/g, "");
  }

  isInvalidLength(cpf: string) {
      return cpf.length !== 11;
  }

  isBlocked(cpf: string) {
      const [digit1] = cpf;
      return cpf.split("").every(digit => digit === digit1);
  }

  calculateDigit(cpf: string, factor: number, max: number) {
      let total = 0;
      for (const digit of this.toDigitArray(cpf).slice(0, max)) {
          total += digit * factor--;
      }
      return (total%11 < 2) ? 0 : (11 - total%11);
  }

  toDigitArray(cpf: string) {
      return [...cpf].map(digit => parseInt(digit));
  }

  getCheckDigit(cpf: string) {
      return cpf.slice(9);
  }

  execute(enrollmentRequest: any) {
    if(!(/^([A-Za-z]+ )+([A-Za-z])+$/).test(enrollmentRequest.student.name)) {
      throw new Error('Invalid name');
    }
    if(!this.validateCpf(enrollmentRequest.student.cpf)) {
      throw new Error('Invalid cpf');
    }
    const  existingStudentEnrollment = this.enrollments.find(enrollment =>
      enrollment.student.cpf === enrollmentRequest.student.cpf);
      if(existingStudentEnrollment) throw new Error('Enrollment duplicated student is not allowed');
    const enrollmentStudent = {
      student: {
        cpf: enrollmentRequest.student.cpf,
        name: enrollmentRequest.student.name,
      }
    }
    this.enrollments.push(enrollmentStudent);
  }
}