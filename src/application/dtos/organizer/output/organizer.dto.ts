import { IOrganizer } from '../../../../domain/entities/organizer.entity';

export class OrganizerDTO implements Partial<IOrganizer> {
  id!: string;
  name!: string;
  email!: string;
  is_company!: boolean;
  company_details?: { address?: string; phone?: number };
  created_at!: Date;
  updated_at?: Date;
}
