export default interface ModuleRepository {
  find(level: string, code: string): any;
}