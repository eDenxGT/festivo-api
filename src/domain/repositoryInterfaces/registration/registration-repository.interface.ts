import { IRegistrationWithEventDTO } from '../../../application/dtos/event/output/registration-with-event.dto';
import { IRegistrationModel } from '../../../infrastructure/models/registration.model';
import { IRegistration } from '../../entities/registration.entity';
import { IBaseRepository } from '../base-repository.interface';

export interface IRegistrationRepository
  extends IBaseRepository<IRegistrationModel> {
  findByEventAndEmail(
    event_id: string,
    email: string
  ): Promise<IRegistration | null>;

  findRegistrationDetailsWithEvent(
    registration_id: string
  ): Promise<IRegistrationWithEventDTO | null>;
}
