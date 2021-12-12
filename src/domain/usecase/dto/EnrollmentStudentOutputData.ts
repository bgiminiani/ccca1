export default class EnrollmentStudentOutputData {
  code: string;
  invoices: any[];

  constructor(code: string) {
    this.code = code;
    this.invoices= [];
  }
}