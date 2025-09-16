import { IRegistration } from '../../entities/registration.entity';

export interface IEventRegistrationUseCase {
  execute(data: Omit<IRegistration, 'id'>): Promise<IRegistration>;
}
