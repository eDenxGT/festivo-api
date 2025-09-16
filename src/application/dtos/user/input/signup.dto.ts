import { IUser } from '../../../../domain/entities/user.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export type UserSignUpFields = 'email' | 'name' | 'password';

export class UserSignUpDTO implements Pick<IUser, UserSignUpFields> {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
