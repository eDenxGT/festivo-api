import { inject, injectable } from 'tsyringe';
import { ICreateEventUseCase } from '../../../domain/usecaseInterfaces/event/create-event-usecase.interface';
import { HTTP_STATUS } from '../../../shared/constants';
import { ERROR_MESSAGES } from '../../../shared/constants/error-messages.constants';
import { AppError } from '../../../shared/errors/AppError';
import { CreateEventDTO } from '../../dtos/event/input/create-event.dto';
import { IEventRepository } from '../../../domain/repositoryInterfaces/event/event-repository.interface';
import { ISendEventInvitationUseCase } from '../../../domain/usecaseInterfaces/event/send-event-invitation-usecase.interface';

@injectable()
export class CreateEventUseCase implements ICreateEventUseCase {
  constructor(
    @inject('IEventRepository') private _eventRepository: IEventRepository,
    @inject('ISendEventInvitationUseCase')
    private _sendEventInvitationUseCase: ISendEventInvitationUseCase
  ) {}
  async execute(data: CreateEventDTO): Promise<void> {
    if (data.is_paid && !data.price) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.INVALID_PRICE,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const eventPopulated = await (
      await this._eventRepository.save(data)
    ).populate({
      path: 'organizer_id',
      select: '-password'
    });

    const eventDetailsUpdated = {
      id: eventPopulated.id,
      organizer: eventPopulated.organizer_id,
      ...eventPopulated.toObject()
    };

    this._sendEventInvitationUseCase.execute(eventDetailsUpdated);
  }
}
