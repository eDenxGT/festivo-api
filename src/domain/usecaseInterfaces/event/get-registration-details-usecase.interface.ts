import { IRegistrationWithEventDTO } from '../../../application/dtos/event/output/registration-with-event.dto';

export interface IGetRegistrationDetails {
  execute(registration_id: string): Promise<IRegistrationWithEventDTO>;
}
