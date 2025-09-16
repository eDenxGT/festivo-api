import { CreateEventDTO } from '../../../application/dtos/event/input/create-event.dto';
import { IEvent } from '../../../domain/entities/event.entity';
import { IEventModel } from '../../../infrastructure/models/event.model';
import { IBaseMapper } from '../base-mapper.interface';

export class EventMapper
  implements IBaseMapper<IEvent, unknown, CreateEventDTO>
{
  static toDomainFromDB(dbObject: IEventModel): IEvent {
    return {
      id: dbObject._id.toString(),
      organizer_id: dbObject.organizer_id,
      title: dbObject.title,
      description: dbObject.description,
      location: dbObject.location,
      floor_details: dbObject.floor_details,
      date: dbObject.date,
      is_paid: dbObject.is_paid,
      price: dbObject.price,
      food_available: dbObject.food_available,
      food_options: dbObject.food_options,
      max_tickets: dbObject.max_tickets,
      guests: dbObject.guests || [],
      judges: dbObject.judges || [],
      created_at: dbObject.created_at,
      updated_at: dbObject.updated_at
    };
  }
}
