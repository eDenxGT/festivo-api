import { inject, injectable } from 'tsyringe';
import { IUpdateRegistrationStatusUseCase } from '../../../domain/usecaseInterfaces/event/update-registration-status-usecase.interface';
import { IRegistrationRepository } from '../../../domain/repositoryInterfaces/registration/registration-repository.interface';

@injectable()
export class UpdateRegistrationStatusUseCase
  implements IUpdateRegistrationStatusUseCase
{
  constructor(
    @inject('IRegistrationRepository')
    private _registrationRepository: IRegistrationRepository
  ) {}
  async execute(data: {
    registration_id: string;
    type: 'food_coupon' | 'entry_ticket';
    food_field?: 'morning' | 'noon' | 'evening';
  }): Promise<void> {
    if (data.type === 'entry_ticket') {
      await this._registrationRepository.update(
        { _id: data.registration_id },
        { entry_ticket_status: 'used' }
      );
    } else {
      const fieldToUpdate = `food_coupons.${data.food_field}`;
      await this._registrationRepository.update(
        { _id: data.registration_id },
        { [fieldToUpdate]: 'claimed' }
      );
    }
  }
}
