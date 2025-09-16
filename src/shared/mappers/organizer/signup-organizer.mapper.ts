import {
  OrganizerSignUpDTO,
  OrganizerSignUpFields
} from '../../../application/dtos/organizer/input/signup.dto';
import { OrganizerDTO } from '../../../application/dtos/organizer/output/organizer.dto';
import { IOrganizer } from '../../../domain/entities/organizer.entity';
import { IOrganizerModel } from '../../../infrastructure/models/organizer.model';
import { IBaseMapper } from '../base-mapper.interface';

export class SignUpOrganizerMapper
  implements IBaseMapper<IOrganizer, OrganizerSignUpDTO, OrganizerDTO>
{
  static toDomainFromInput(
    dto: OrganizerSignUpDTO
  ): Pick<IOrganizerModel, OrganizerSignUpFields> {
    return {
      email: dto.email,
      name: dto.name,
      password: dto.password,
      is_company: dto.is_company
    };
  }
}
