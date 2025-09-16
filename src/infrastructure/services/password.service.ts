import { injectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import envConfig from '../../shared/config';
import { IPasswordService } from '../../domain/serviceInterfaces/password-service.interface';

@injectable()
export class PasswordService implements IPasswordService {
  async hash(original: string) {
    return bcrypt.hash(original, envConfig.bcryptSaltRounds);
  }
  async compare(current: string, original: string) {
    return bcrypt.compare(current, original);
  }
}
