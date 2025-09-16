export interface IPasswordService {
  hash(original: string): Promise<string>;
  compare(current: string, original: string): Promise<boolean>;
}
