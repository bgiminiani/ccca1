import Period from "./Period";

export default class Classroom {
  level: string;
  module: string;
  code: string;
  capacity: number;
  startDate: Date;
  endDate: Date;
  period: Period;

  constructor({
    level,
    module,
    code,
    capacity,
    startDate,
    endDate,
  }: {
    level: string,
    module: string,
    code: string,
    capacity: number,
    startDate: Date,
    endDate: Date,
  }) {
    this.level = level;
    this.module = module;
    this.code = code;
    this.capacity = capacity;
    this.startDate = startDate;
    this.endDate = endDate;
    this.period = new Period(this.startDate, this.endDate);
  }

  isFinished(currentDate: Date) {
    return currentDate.getTime() >= this.endDate.getTime();
  }

  getProgress(currentDate: Date) {
    const leftToTheEnd = new Period(this.startDate, currentDate).getDiffInDays();
    const periodOfClassroom = this.period.getDiffInDays();
    return leftToTheEnd / periodOfClassroom * 100;
  }
}