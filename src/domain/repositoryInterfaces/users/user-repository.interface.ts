import { IUserModel } from '../../../infrastructure/models/user.model';
import { IBaseRepository } from '../base-repository.interface';

export interface IUserRepository extends IBaseRepository<IUserModel> {}
