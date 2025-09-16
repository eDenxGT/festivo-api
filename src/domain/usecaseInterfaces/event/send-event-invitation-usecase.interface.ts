import { IEventWithOrganizer } from '../../types/event.types';

export interface ISendEventInvitationUseCase {
  execute(data: IEventWithOrganizer): Promise<void>;
}
