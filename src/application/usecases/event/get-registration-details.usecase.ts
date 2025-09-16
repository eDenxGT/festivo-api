import { IRegistrationRepository } from '../../../domain/repositoryInterfaces/registration/registration-repository.interface';
import { IGetRegistrationDetails } from '../../../domain/usecaseInterfaces/event/get-registration-details-usecase.interface';
import { HTTP_STATUS } from '../../../shared/constants';
import { ERROR_MESSAGES } from '../../../shared/constants/error-messages.constants';
import { AppError } from '../../../shared/errors/AppError';
import { IRegistrationWithEventDTO } from '../../dtos/event/output/registration-with-event.dto';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GetRegistrationDetails implements IGetRegistrationDetails {
  constructor(
    @inject('IRegistrationRepository')
    private _registrationRepository: IRegistrationRepository
  ) {}
  async execute(registration_id: string): Promise<IRegistrationWithEventDTO> {
    const registration =
      await this._registrationRepository.findRegistrationDetailsWithEvent(
        registration_id
      );
    if (!registration) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return registration;
  }
}
