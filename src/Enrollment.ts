import Level from "./Level";
import Module from "./Module";
import Classroom from "./Classroom";
import Student from "./Student"
import EnrollmentCode from "./EnrollmentCode";
import Invoice from "./Invoice";
import InvoiceEvent from "./InvoiceEvent";

export default class Enrollment {
  student: Student;
  level: Level;
  module: Module;
  classroom: Classroom;
  issueDate: Date;
  sequence: number;
  code: EnrollmentCode;
  installments: number;
  invoices: Invoice[];

  constructor(student: Student, level: Level, module: Module, classroom: Classroom, issueDate: Date, sequence: number, installments = 1) {
    if (student.getAge() < module.minimumAge) throw new Error('Should not enroll student below minimum age');
    if(classroom.isFinished(issueDate)) throw new Error('Class is already finished');
    if(classroom.getProgress(issueDate) > 25) throw new Error('Class time period exceeded 25% of its start date');
    this.student = student;
    this.level = level;
    this.module = module;
    this.classroom = classroom;
    this.issueDate = issueDate;
    this.sequence = sequence;
    this.code = new EnrollmentCode(level.code, module.code, classroom.code, issueDate, sequence);
    this.invoices = [];
    this.installments = installments;
    this.generateInvoice();
  }

  generateInvoice() {
    let installmentAmount = Math.trunc((this.module.price / this.installments) * 100) / 100
    for(let i = 1; i <= this.installments; i++) {
      this.invoices.push(new Invoice(this.code.value, i, this.issueDate.getFullYear(), installmentAmount));
    }
    const total = this.invoices.reduce((total, invoice) => {
      total+= invoice.amount;
      return total;
    }, 0);
    const rest = Math.trunc((this.module.price - total)*100)/100;
    this.invoices[this.invoices.length - 1].amount = installmentAmount + rest; 
  }

  getInvoiceBalance() {
    const balance = this.invoices.reduce((total, invoice) => {
      total += invoice.getBalance();
      return total;
    }, 0)
    return balance;
  }


  getInvoice(month: number, year: number): Invoice | undefined {
    const invoice = this.invoices.find(invoice => invoice.month === month && invoice.year === year);
    return invoice;
  }

  payInvoice(month: number, year: number, amount: number) {
    const invoice = this.getInvoice(month, year);
    if (!invoice) throw new Error('Invalid invoice');
    invoice.addEvent(new InvoiceEvent('payment', amount ));
  }
}