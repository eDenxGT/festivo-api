import { IUser } from './user.entity';

export interface IOrganizer extends IUser {
  is_company: boolean;
  company_details?: {
    address?: string;
    phone?: number;
  };
}
