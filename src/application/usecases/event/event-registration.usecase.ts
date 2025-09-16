import { inject, injectable } from 'tsyringe';
import { IEventRegistrationUseCase } from '../../../domain/usecaseInterfaces/event/event-registration-usecase.interface';
import { IRegistration } from '../../../domain/entities/registration.entity';
import { IRegistrationRepository } from '../../../domain/repositoryInterfaces/registration/registration-repository.interface';
import { AppError } from '../../../shared/errors/AppError';
import { ERROR_MESSAGES } from '../../../shared/constants/error-messages.constants';
import { HTTP_STATUS } from '../../../shared/constants';

@injectable()
export class EventRegistrationUseCase implements IEventRegistrationUseCase {
  constructor(
    @inject('IRegistrationRepository')
    private _registrationRepository: IRegistrationRepository
  ) {}
  async execute(data: Omit<IRegistration, 'id'>): Promise<IRegistration> {
    const isRegistrationExists =
      await this._registrationRepository.findByEventAndEmail(
        data.event_id,
        data.participant_details?.email
      );

    if (isRegistrationExists)
      throw new AppError(
        ERROR_MESSAGES.CLIENT.REGISTRATION_EXISTS,
        HTTP_STATUS.CONFLICT
      );

    const registration = await this._registrationRepository.save(data);

    return {
      ...registration,
      id: registration._id.toString()
    };
  }
}
