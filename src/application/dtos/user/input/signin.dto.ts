import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IUser } from '../../../../domain/entities/user.entity';

export type UserSignInFields = 'email' | 'password';

export class UserSignInDTO implements Pick<IUser, UserSignInFields> {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  role!: 'user' | 'organizer';
}
