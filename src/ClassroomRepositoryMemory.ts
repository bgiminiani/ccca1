import Classroom from "./Classroom";
import ClassroomRepository from "./ClassroomRepository";

export default class ClassroomRepositoryMemory implements ClassroomRepository {
  classrooms: Classroom[];
  constructor() {
    this.classrooms = [
      new Classroom({
          level: "EM",
          module: "1",
          code: "A",
          capacity: 2,
          startDate: new Date("2021-08-20"),
          endDate: new Date("2022-12-31"),
      }),
      new Classroom({
          level: "EM",
          module: "1",
          code: "B",
          capacity: 1,
          startDate: new Date("2021-06-20"),
          endDate: new Date("2021-12-31"),
      }),
      new Classroom({
          level: "EM",
          module: "1",
          code: "C",
          capacity: 2,
          startDate: new Date("2021-06-20"),
          endDate: new Date("2021-11-20"),
      }),
      new Classroom({
          level: "EM",
          module: "1",
          code: "D",
          capacity: 1,
          startDate: new Date("2021-08-20"),
          endDate: new Date("2022-12-31"),
      }),
    ];
  }

  find(level: string, module: string, code: string) {
    const classroom = this.classrooms.find(classroom => classroom.level === level &&
      classroom.module === module &&
      classroom.code === code);
    if (!classroom)new Error("Class room not found.");
    return classroom;
  }

}