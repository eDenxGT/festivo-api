import { OrganizerDTO } from '../../../application/dtos/organizer/output/organizer.dto';
import { IOrganizer } from '../../../domain/entities/organizer.entity';
import { IOrganizerModel } from '../../../infrastructure/models/organizer.model';
import { IBaseMapper } from '../base-mapper.interface';

export class OrganizerMapper
  implements IBaseMapper<IOrganizer, unknown, OrganizerDTO>
{
  static toDomainFromDB(
    dbObject: IOrganizerModel
  ): Omit<IOrganizer, 'password'> {
    return {
      id: dbObject._id.toString(),
      email: dbObject.email,
      name: dbObject.name,
      is_company: true,
      created_at: dbObject.created_at,
      updated_at: dbObject.updated_at
    };
  }

  static toDTO(entity: IOrganizer): OrganizerDTO {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      is_company: entity.is_company,
      created_at: entity.created_at,
      updated_at: entity.updated_at
    };
  }
}
