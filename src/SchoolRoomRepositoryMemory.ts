import SchoolRoomRepository from "./SchoolRoomRepository";

export default class SchoolRoomRepositoryMemory implements SchoolRoomRepository {
  schoolRooms: any[];
  constructor() {
    this.schoolRooms = [
      {
          level: "EM",
          module: "1",
          code: "A",
          capacity: 1 
      },
      {
          level: "EM",
          module: "1",
          code: "B",
          capacity: 2 
      }
    ];
  }

  find(level: string, module: string, code: string) {
    const schoolRoom = this.schoolRooms.find(schoolRoom => schoolRoom.level === level &&
      schoolRoom.module === module &&
      schoolRoom.code === code);
    if (!schoolRoom)new Error("School Room not found.");
    return schoolRoom;
  }

}