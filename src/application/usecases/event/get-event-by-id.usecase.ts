import { inject, injectable } from 'tsyringe';
import { IEvent } from '../../../domain/entities/event.entity';
import { IGetEventByIdUseCase } from '../../../domain/usecaseInterfaces/event/get-event-by-id-usecase.interface';
import { IEventRepository } from '../../../domain/repositoryInterfaces/event/event-repository.interface';
import { AppError } from '../../../shared/errors/AppError';
import { HTTP_STATUS } from '../../../shared/constants';
import { ERROR_MESSAGES } from '../../../shared/constants/error-messages.constants';

@injectable()
export class GetEventByIdUseCase implements IGetEventByIdUseCase {
  constructor(
    @inject('IEventRepository') private _eventRepository: IEventRepository
  ) {}

  async execute(event_id: string): Promise<IEvent> {
    const event = await this._eventRepository.findOne({ _id: event_id });

    if (!event) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return {
      ...event,
      id: event._id.toString()
    };
  }
}
