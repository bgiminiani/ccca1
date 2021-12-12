import Level from "../entity/Level";

export default interface LevelRepository {
  find(code: string): Level;
}