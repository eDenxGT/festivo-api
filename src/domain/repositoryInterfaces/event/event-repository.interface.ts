import { FilterQuery } from 'mongoose';
import { IEventModel } from '../../../infrastructure/models/event.model';
import { IBaseRepository } from '../base-repository.interface';
import { IEvent } from '../../entities/event.entity';

export interface IEventRepository extends IBaseRepository<IEventModel> {
  findAllEventsBySearch(filter: FilterQuery<IEventModel>): Promise<IEvent[]>;
}
