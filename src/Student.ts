import Cpf from "./Cpf";
import Name from "./Name";

export default class Student {
  name: Name;
  cpf: Cpf;
  birthDate: string

  constructor(name: string, cpf: string, birthDate: string) {
    this.name = new Name(name);
    this.cpf = new Cpf(cpf);
    this.birthDate = birthDate;
  }

  getAge() {
    const birthYear = new Date(this.birthDate).getFullYear();
    const actualYear = new Date().getFullYear();
    return actualYear - birthYear;
  }
}