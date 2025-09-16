import { IEvent } from '../../entities/event.entity';

export interface IGetEventByIdUseCase {
  execute(event_id: string): Promise<IEvent>;
}
