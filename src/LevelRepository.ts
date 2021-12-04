import Level from "./Level";

export default interface LevelRepository {
  find(code: string): Level;
}