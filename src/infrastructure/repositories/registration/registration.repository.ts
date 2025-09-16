import { injectable } from 'tsyringe';
import {
  IRegistrationModel,
  RegistrationModel
} from '../../models/registration.model';
import { IRegistrationRepository } from '../../../domain/repositoryInterfaces/registration/registration-repository.interface';
import { BaseRepository } from '../base.repository';
import { IRegistration } from '../../../domain/entities/registration.entity';
import { IRegistrationWithEventDTO } from '../../../application/dtos/event/output/registration-with-event.dto';
import { Types } from 'mongoose';

@injectable()
export class RegistrationRepository
  extends BaseRepository<IRegistrationModel>
  implements IRegistrationRepository
{
  constructor() {
    super(RegistrationModel);
  }

  async findByEventAndEmail(
    event_id: string,
    email: string
  ): Promise<IRegistration | null> {
    const registration = await this.model.findOne({
      $and: [{ event_id }, { 'participant_details.email': email }]
    });

    if (!registration) return null;

    return {
      ...registration,
      id: registration?._id.toString()!
    };
  }

  async findRegistrationDetailsWithEvent(
    registration_id: string
  ): Promise<IRegistrationWithEventDTO | null> {
    const registration = await this.model.aggregate([
      {
        $match: { _id: new Types.ObjectId(registration_id) }
      },
      {
        $lookup: {
          from: 'events',
          let: { eventId: { $toObjectId: '$event_id' } },
          pipeline: [
            {
              $match: { $expr: { $eq: ['$_id', '$$eventId'] } }
            }
          ],
          as: 'eventDetails'
        }
      },
      { $unwind: '$eventDetails' },
      {
        $project: {
          _id: 1,
          user_id: 1,
          email: 1,
          role: 1,
          entry_ticket_status: 1,
          participant_details: 1,
          food_coupons: 1,
          created_at: 1,
          updated_at: 1,
          'eventDetails._id': 1,
          'eventDetails.title': 1,
          'eventDetails.date': 1,
          'eventDetails.location': 1
        }
      }
    ]);

    return (registration[0] as IRegistrationWithEventDTO) ?? null;
  }
}
