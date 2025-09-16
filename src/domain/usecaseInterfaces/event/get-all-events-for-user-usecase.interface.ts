import { IEvent } from '../../entities/event.entity';

export interface IGetAllEventsForUserUseCase {
  execute(search: string): Promise<IEvent[]>;
}
