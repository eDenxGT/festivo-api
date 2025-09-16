import { CreateEventDTO } from '../../../application/dtos/event/input/create-event.dto';

export interface ICreateEventUseCase {
  execute(data: CreateEventDTO): Promise<void>;
}
