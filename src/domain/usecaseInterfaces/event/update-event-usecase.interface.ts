import { EditEventDTO } from '../../../application/dtos/event/input/edit-event.dto';

export interface IUpdateEventUseCase {
  execute(eventData: EditEventDTO): Promise<void>;
}
