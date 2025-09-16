import { injectable } from 'tsyringe';
import { BaseRepository } from '../base.repository';
import { IOrganizerModel, OrganizerModel } from '../../models/organizer.model';
import { IOrganizerRepository } from '../../../domain/repositoryInterfaces/users/organizer-repository.interface';

@injectable()
export class OrganizerRepository
  extends BaseRepository<IOrganizerModel>
  implements IOrganizerRepository
{
  constructor() {
    super(OrganizerModel);
  }
}
