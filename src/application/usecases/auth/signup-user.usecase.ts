import { inject, injectable } from 'tsyringe';
import { ISignUpUserUseCase } from '../../../domain/usecaseInterfaces/auth/signup-user-usecase.interface';
import { UserSignUpDTO } from '../../dtos/user/input/signup.dto';
import { IOrganizerRepository } from '../../../domain/repositoryInterfaces/users/organizer-repository.interface';
import { IUserRepository } from '../../../domain/repositoryInterfaces/users/user-repository.interface';
import { OrganizerSignUpDTO } from '../../dtos/organizer/input/signup.dto';
import { AppError } from '../../../shared/errors/AppError';
import { ERROR_MESSAGES } from '../../../shared/constants/error-messages.constants';
import { HTTP_STATUS } from '../../../shared/constants';
import { IPasswordService } from '../../../domain/serviceInterfaces/password-service.interface';

@injectable()
export class SignUpUserUseCase implements ISignUpUserUseCase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('IOrganizerRepository')
    private _organizerRepo: IOrganizerRepository,
    @inject('IPasswordService') private _passwordService: IPasswordService
  ) {}
  async execute(data: UserSignUpDTO | OrganizerSignUpDTO): Promise<void> {
    let repository;
    if ('is_company' in data) {
      repository = this._organizerRepo;
    } else {
      repository = this._userRepo;
    }

    const userExists = await repository.findOne({ email: data.email });

    if (userExists) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.ACCOUNT_EXISTS,
        HTTP_STATUS.CONFLICT
      );
    }

    const hashedPassword = await this._passwordService.hash(data.password);

    await repository.save({ ...data, password: hashedPassword });
  }
}
