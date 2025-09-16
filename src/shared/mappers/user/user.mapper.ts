import { UserDTO } from '../../../application/dtos/user/output/user.dto';
import { IUser } from '../../../domain/entities/user.entity';
import { IUserModel } from '../../../infrastructure/models/user.model';
import { IBaseMapper } from '../base-mapper.interface';

export class UserMapper implements IBaseMapper<IUser, unknown, UserDTO> {
  static toDomainFromDB(dbObject: IUserModel): Omit<IUser, 'password'> {
    return {
      id: dbObject._id.toString(),
      email: dbObject.email,
      name: dbObject.name,
      created_at: dbObject.created_at,
      updated_at: dbObject.updated_at
    };
  }

  static toDTO(entity: IUser): UserDTO {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    };
  }
}
