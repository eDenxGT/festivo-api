import { OrganizerDTO } from '../../../application/dtos/organizer/output/organizer.dto';
import { UserSignInDTO } from '../../../application/dtos/user/input/signin.dto';
import { UserDTO } from '../../../application/dtos/user/output/user.dto';

export interface ISignInUserUseCase {
  execute(
    data: UserSignInDTO
  ): Promise<
    (UserDTO | OrganizerDTO) & { refreshToken: string; accessToken: string }
  >;
}
