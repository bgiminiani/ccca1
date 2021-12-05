export default class Classroom {
  level: string;
  module: string;
  code: string;
  capacity: number;
  startDate: Date;
  endDate: Date;

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
  }

  isFinished(currentDate: Date) {
    return currentDate.getTime() >= this.endDate.getTime();
  }

  getLengthInDays() {
    const diffInMilli = this.endDate.getTime() - this.startDate.getTime();
    return diffInMilli/(1000*60*60*24);

  }

  getProgress(currentDate: Date) {
    const diffInMilliUntilEndDate = currentDate.getTime() - this.startDate.getTime()
    const remainInDays = diffInMilliUntilEndDate/(1000*60*60*24);
    return ((remainInDays / this.getLengthInDays()) * 100);
  }
}