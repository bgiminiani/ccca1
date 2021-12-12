export default interface ClassroomRepository {
  find(level: string, module: string, code: string): any;
}