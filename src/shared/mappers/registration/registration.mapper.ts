import { IRegistration } from '../../../domain/entities/registration.entity';
import { IBaseMapper } from '../base-mapper.interface';

export class RegistrationMapper
  implements IBaseMapper<IRegistration, unknown, unknown> {
  // static toDomainFromDB(dbObject: any): IRegistration | void {}
}
