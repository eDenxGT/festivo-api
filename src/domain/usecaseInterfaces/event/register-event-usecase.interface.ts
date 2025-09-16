export interface IRegisterEventUseCase {
  execute({
    event_id,
    user_id
  }: {
    event_id: string;
    user_id: string;
  }): Promise<void>;
}
