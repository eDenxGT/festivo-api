import {
  UserSignUpFields,
  UserSignUpDTO
} from '../../../application/dtos/user/input/signup.dto';
import { UserDTO } from '../../../application/dtos/user/output/user.dto';
import { IUser } from '../../../domain/entities/user.entity';
import { IUserModel } from '../../../infrastructure/models/user.model';
import { IBaseMapper } from '../base-mapper.interface';

export class SignUpUserMapper
  implements IBaseMapper<IUser, UserSignUpDTO, UserDTO>
{
  static toDomainFromInput(
    dto: UserSignUpDTO
  ): Pick<IUserModel, UserSignUpFields> {
    return {
      email: dto.email,
      name: dto.name,
      password: dto.password
    };
  }
}
