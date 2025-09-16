import { inject, injectable } from 'tsyringe';
import { ISignInUserUseCase } from '../../../domain/usecaseInterfaces/auth/signin-user-usecase.interface';
import { UserSignInDTO } from '../../dtos/user/input/signin.dto';
import { IUserRepository } from '../../../domain/repositoryInterfaces/users/user-repository.interface';
import { IOrganizerRepository } from '../../../domain/repositoryInterfaces/users/organizer-repository.interface';
import { AppError } from '../../../shared/errors/AppError';
import { ERROR_MESSAGES } from '../../../shared/constants/error-messages.constants';
import { HTTP_STATUS } from '../../../shared/constants';
import { IPasswordService } from '../../../domain/serviceInterfaces/password-service.interface';
import { IJwtService } from '../../../domain/serviceInterfaces/jwt-service.interface';
import { UserDTO } from '../../dtos/user/output/user.dto';
import { OrganizerDTO } from '../../dtos/organizer/output/organizer.dto';
import { OrganizerMapper } from '../../../shared/mappers/organizer/organizer.mapper';
import { UserMapper } from '../../../shared/mappers/user/user.mapper';
import { IOrganizerModel } from '../../../infrastructure/models/organizer.model';
import { IUserModel } from '../../../infrastructure/models/user.model';

export type SignInResponseDTO = {
  accessToken: string;
  refreshToken: string;
} & (UserDTO | OrganizerDTO);

@injectable()
export class SignInUserUseCase implements ISignInUserUseCase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('IOrganizerRepository')
    private _organizerRepo: IOrganizerRepository,
    @inject('IPasswordService') private _passwordService: IPasswordService,
    @inject('IJwtService') private _jwtService: IJwtService
  ) {}
  async execute(data: UserSignInDTO): Promise<SignInResponseDTO> {
    let repository;

    if (data.role === 'organizer') {
      repository = this._organizerRepo;
    } else {
      repository = this._userRepo;
    }

    const userData = await repository.findOne({ email: data.email });

    if (!userData) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.ACCOUNT_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    let mappedData =
      data.role === 'organizer'
        ? OrganizerMapper.toDomainFromDB(userData as IOrganizerModel)
        : UserMapper.toDomainFromDB(userData as IUserModel);

    const isPasswordMatch = await this._passwordService.compare(
      data.password,
      userData.password
    );

    if (!isPasswordMatch) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.INVALID_CREDENTIALS,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const accessToken = this._jwtService.generateAccessToken({
      id: mappedData.id,
      email: mappedData.email,
      role: data.role
    });

    const refreshToken = this._jwtService.generateRefreshToken({
      id: mappedData.id,
      email: mappedData.email,
      role: data.role
    });

    return { ...mappedData, refreshToken, accessToken };
  }
}
