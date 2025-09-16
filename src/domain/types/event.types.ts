import { SpecialParticipantDto } from '../../application/dtos/event/input/create-event.dto';

export interface IEventWithOrganizer {
  organizer: {
    name: string;
    email: string;
    is_company: string;
  };
  id: string;
  title: string;
  description: string;
  location: string;
  floor_details?: string;
  date: Date;
  food_available: boolean;
  food_options?: {
    morning?: boolean;
    noon?: boolean;
    evening?: boolean;
  };
  guests?: SpecialParticipantDto[];
  judges?: SpecialParticipantDto[];
}
