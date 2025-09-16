import { UserSignUpDTO } from '../../../application/dtos/user/input/signup.dto';

export interface ISignUpUserUseCase {
  execute(data: UserSignUpDTO): Promise<void>;
}
