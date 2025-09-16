import { inject, injectable } from 'tsyringe';
import { IRegisterEventUseCase } from '../../../domain/usecaseInterfaces/event/register-event-usecase.interface';
import { IRegistrationRepository } from '../../../domain/repositoryInterfaces/registration/registration-repository.interface';
import { AppError } from '../../../shared/errors/AppError';
import { ERROR_MESSAGES } from '../../../shared/constants/error-messages.constants';
import { HTTP_STATUS } from '../../../shared/constants';
import { IUserRepository } from '../../../domain/repositoryInterfaces/users/user-repository.interface';
import { IRegistration } from '../../../domain/entities/registration.entity';
import { IEventRepository } from '../../../domain/repositoryInterfaces/event/event-repository.interface';
import { generateQRCode } from '../../../shared/utils/helpers/qrcode.helper';
import { generateFullTicketTemplate } from '../../../shared/constants/mail-template.constants';
import { IEmailService } from '../../../domain/serviceInterfaces/email-service.interface';

@injectable()
export class RegisterEventUseCase implements IRegisterEventUseCase {
  constructor(
    @inject('IRegistrationRepository')
    private _registrationRepository: IRegistrationRepository,
    @inject('IUserRepository')
    private _userRepository: IUserRepository,
    @inject('IEventRepository') private _eventRepository: IEventRepository,
    @inject('IEmailService') private _emailService: IEmailService
  ) {}

  async execute({
    event_id,
    user_id
  }: {
    event_id: string;
    user_id: string;
  }): Promise<void> {
    const registrationExists = await this._registrationRepository.findOne({
      'participant_details.id': user_id,
      event_id
    });
    
    if (registrationExists) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.REGISTRATION_EXISTS,
        HTTP_STATUS.CONFLICT
      );
    }
    
    const userData = await this._userRepository.findOne({ _id: user_id });

    const eventDetails = await this._eventRepository.findOne({ _id: event_id });

    if (!userData || !eventDetails) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }

    const registrationData: Omit<IRegistration, 'id'> = {
      participant_details: {
        id: userData?._id.toString(),
        name: userData?.name!,
        email: userData?.email!,
        is_special: false
      },
      event_id,
      role: 'participant',
      entry_ticket_status: 'valid',
      food_coupons: {
        morning: eventDetails?.food_options?.morning
          ? 'available'
          : 'not_applicable',
        noon: eventDetails?.food_options?.noon ? 'available' : 'not_applicable',
        evening: eventDetails?.food_options?.evening
          ? 'available'
          : 'not_applicable'
      }
    };

    const registration =
      await this._registrationRepository.save(registrationData);

    const qrBase64 = await generateQRCode({
      registration_id: registration._id.toString(),
      event_id: registration.event_id,
      role: registration.role,
      email: userData.email!
    });

    const emailHtml = generateFullTicketTemplate(userData.name, eventDetails);

    await this._emailService.sendInvitationMail({
      to: userData.email,
      subject: `🎫 Your Ticket for ${eventDetails.title}`,
      html: emailHtml,
      qrBase64
    });
  }
}
