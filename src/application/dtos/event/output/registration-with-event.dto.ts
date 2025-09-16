import { IEvent } from '../../../../domain/entities/event.entity';
import { IRegistration } from '../../../../domain/entities/registration.entity';

export interface IRegistrationWithEventDTO extends IRegistration {
  eventDetails: IEvent;
}
