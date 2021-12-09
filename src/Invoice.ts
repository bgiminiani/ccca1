import Cloneable from "./Cloneable";

export default class Invoice implements Cloneable{
  code: string;
  month: number;
  year: number;
  amount: number;

  constructor(
    code: string,
    month: number,
    year:number,
    amount:number
  ) {
    this.code = code;
    this.month = month;
    this.year = year;
    this.amount = amount;
  }

  clone() {
    return JSON.parse(JSON.stringify(this));
  }
}