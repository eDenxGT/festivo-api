import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength
} from 'class-validator';
import { IOrganizer } from '../../../../domain/entities/organizer.entity';

export type OrganizerSignUpFields =
  | 'email'
  | 'name'
  | 'password'
  | 'is_company';

export class CompanyDetailsDTO {
  @IsOptional()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  phone?: number;
}

export class OrganizerSignUpDTO
  implements Pick<IOrganizer, OrganizerSignUpFields>
{
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsBoolean()
  is_company!: boolean;
}
