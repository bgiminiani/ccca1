import ClassroomRepository from "./ClassroomRepository";

export default class ClassroomRepositoryMemory implements ClassroomRepository {
  classrooms: any[];
  constructor() {
    this.classrooms = [
      {
          level: "EM",
          module: "1",
          code: "A",
          capacity: 1, 
          startDate: "2021-01-20",
          endDate: "2021-12-31",
      },
      {
          level: "EM",
          module: "1",
          code: "B",
          capacity: 2,
          startDate: "2021-01-20",
          endDate: "2021-12-31",
      },
      {
          level: "EM",
          module: "1",
          code: "C",
          capacity: 2,
          startDate: "2021-01-20",
          endDate: "2021-11-20",
      }
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