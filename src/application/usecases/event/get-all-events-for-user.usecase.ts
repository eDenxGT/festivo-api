import { inject, injectable } from 'tsyringe';
import { IEvent } from '../../../domain/entities/event.entity';
import { IGetAllEventsForUserUseCase } from '../../../domain/usecaseInterfaces/event/get-all-events-for-user-usecase.interface';
import { IEventRepository } from '../../../domain/repositoryInterfaces/event/event-repository.interface';

@injectable()
export class GetAllEventsForUserUseCase implements IGetAllEventsForUserUseCase {
  constructor(
    @inject('IEventRepository') private _eventRepository: IEventRepository
  ) {}

  async execute(search: string): Promise<IEvent[]> {
    let filter = {};
    if (search.length > 0) {
      filter = {
        title: { $regex: search, $options: 'i' }
      };
    }

    const events = await this._eventRepository.findAllEventsBySearch(filter);
    return events;
  }
}
