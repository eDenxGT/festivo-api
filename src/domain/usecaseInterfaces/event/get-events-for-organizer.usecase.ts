import { IEvent } from '../../entities/event.entity';

export interface IGetEventsForOrganizerUseCase {
  execute(organizer_id: string): Promise<IEvent[]>;
}
