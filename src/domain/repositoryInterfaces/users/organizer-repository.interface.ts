import { IOrganizerModel } from '../../../infrastructure/models/organizer.model';
import { IBaseRepository } from '../base-repository.interface';

export interface IOrganizerRepository
  extends IBaseRepository<IOrganizerModel> {}
