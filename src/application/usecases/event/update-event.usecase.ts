import { inject, injectable } from 'tsyringe';
import { IUpdateEventUseCase } from '../../../domain/usecaseInterfaces/event/update-event-usecase.interface';
import { EditEventDTO } from '../../dtos/event/input/edit-event.dto';
import { IRegistrationRepository } from '../../../domain/repositoryInterfaces/registration/registration-repository.interface';
import { IEventRepository } from '../../../domain/repositoryInterfaces/event/event-repository.interface';
import { AppError } from '../../../shared/errors/AppError';
import { ERROR_MESSAGES } from '../../../shared/constants/error-messages.constants';
import { HTTP_STATUS } from '../../../shared/constants';

@injectable()
export class UpdateEventUseCase implements IUpdateEventUseCase {
  constructor(
    @inject('IRegistrationRepository')
    private _registrationRepository: IRegistrationRepository,
    @inject('IEventRepository') private _eventRepository: IEventRepository
  ) {}

  async execute(eventData: EditEventDTO): Promise<void> {
    // await this._registrationRepository.update(
    //   { event_id: eventData.id },
    //   { is_valid: false }
    // );

    const event = await this._eventRepository.update(
      { _id: eventData.id },
      eventData
    );

    if (!event) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
  }
}
