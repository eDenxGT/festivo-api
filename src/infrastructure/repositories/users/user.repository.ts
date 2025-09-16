import { injectable } from 'tsyringe';
import { BaseRepository } from '../base.repository';
import { IUserModel, UserModel } from '../../models/user.model';
import { IUserRepository } from '../../../domain/repositoryInterfaces/users/user-repository.interface';

@injectable()
export class UserRepository
  extends BaseRepository<IUserModel>
  implements IUserRepository
{
  constructor() {
    super(UserModel);
  }
}
