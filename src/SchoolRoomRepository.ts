export default interface SchoolRoomRepository {
  find(level: string, module: string, code: string): any;
}