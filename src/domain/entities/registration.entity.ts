export type TicketStatus = 'valid' | 'used';
export type FoodStatus = 'available' | 'claimed' | 'not_applicable';
export type UserEventRole = 'participant' | 'guest' | 'judge';

export interface ParticipantDetails {
  id?: string;
  name: string;
  email: string;
  is_special?: boolean;
}

export interface IRegistration {
  id: string;
  participant_details: ParticipantDetails;
  event_id: string;
  role: UserEventRole;
  entry_ticket_status: TicketStatus;
  food_coupons: {
    morning?: FoodStatus;
    noon?: FoodStatus;
    evening?: FoodStatus;
  };
  created_at?: Date;
  updated_at?: Date;
}
