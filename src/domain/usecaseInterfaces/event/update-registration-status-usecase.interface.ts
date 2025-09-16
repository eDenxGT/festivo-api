export interface IUpdateRegistrationStatusUseCase {
  execute(data: {
    registration_id: string;

    type: 'food_coupon' | 'entry_ticket';
    food_field?: 'morning' | 'noon' | 'evening';
  }): Promise<void>;
}
