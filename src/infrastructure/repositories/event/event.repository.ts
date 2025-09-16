import { injectable } from 'tsyringe';
import { BaseRepository } from '../base.repository';
import { EventModel, IEventModel } from '../../models/event.model';
import { IEventRepository } from '../../../domain/repositoryInterfaces/event/event-repository.interface';
import { FilterQuery } from 'mongoose';
import { IEvent } from '../../../domain/entities/event.entity';

@injectable()
export class EventRepository
  extends BaseRepository<IEventModel>
  implements IEventRepository
{
  constructor() {
    super(EventModel);
  }
  async findAllEventsBySearch(
    filter: FilterQuery<IEventModel>
  ): Promise<IEvent[]> {
    const events: IEvent[] = await EventModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'registrations',
          let: { eventId: { $toString: '$_id' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$event_id', '$$eventId'] }
              }
            }
          ],
          as: 'registrations'
        }
      },
      {
        $addFields: {
          available_tickets: {
            $subtract: ['$max_tickets', { $size: '$registrations' }]
          }
        }
      },
      {
        $project: {
          id: '$_id',
          organizer_id: 1,
          title: 1,
          description: 1,
          location: 1,
          floor_details: 1,
          date: 1,
          is_paid: 1,
          price: 1,
          food_available: 1,
          food_options: 1,
          available_tickets: 1,
          max_tickets: 1,
          guests: 1,
          judges: 1,
          created_at: 1,
          updated_at: 1
        }
      }
    ]);

    return events;
  }
}
