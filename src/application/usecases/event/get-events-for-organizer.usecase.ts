import { inject, injectable } from 'tsyringe';
import { IEvent } from '../../../domain/entities/event.entity';
import { IGetEventsForOrganizerUseCase } from '../../../domain/usecaseInterfaces/event/get-events-for-organizer.usecase';
import { IEventRepository } from '../../../domain/repositoryInterfaces/event/event-repository.interface';

@injectable()
export class GetEventsForOrganizerUseCase
  implements IGetEventsForOrganizerUseCase
{
  constructor(
    @inject('IEventRepository') private _eventRepository: IEventRepository
  ) {}

  async execute(organizer_id: string): Promise<IEvent[]> {
    const events = await this._eventRepository.find({ organizer_id });
    return events.map((event) => ({
      ...event.toObject(),
      id: event._id.toString()
    }));
  }
}
