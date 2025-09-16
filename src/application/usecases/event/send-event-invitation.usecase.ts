import { inject, injectable } from 'tsyringe';
import { ISendEventInvitationUseCase } from '../../../domain/usecaseInterfaces/event/send-event-invitation-usecase.interface';
import { SpecialParticipantDto } from '../../dtos/event/input/create-event.dto';
import { generateEventInvitationTemplate } from '../../../shared/constants/mail-template.constants';
import { generateQRCode } from '../../../shared/utils/helpers/qrcode.helper';
import { IEmailService } from '../../../domain/serviceInterfaces/email-service.interface';
import { IEventWithOrganizer } from '../../../domain/types/event.types';
import { IEventRegistrationUseCase } from '../../../domain/usecaseInterfaces/event/event-registration-usecase.interface';

@injectable()
export class SendEventInvitationUseCase implements ISendEventInvitationUseCase {
  constructor(
    @inject('IEmailService') private _emailService: IEmailService,
    @inject('IEventRegistrationUseCase')
    private _eventRegistrationUseCase: IEventRegistrationUseCase
  ) {}

  async execute(data: IEventWithOrganizer): Promise<void> {
    if (!data.guests && !data.judges) return;

    const participants: {
      role: 'guest' | 'judge';
      info: SpecialParticipantDto;
    }[] = [];

    data.guests?.forEach((guest) =>
      participants.push({ role: 'guest', info: guest })
    );
    data.judges?.forEach((judge) =>
      participants.push({ role: 'judge', info: judge })
    );

    for (const participant of participants) {
      const registration = await this._eventRegistrationUseCase.execute({
        event_id: data.id,
        participant_details: {
          name: participant.info.name,
          email: participant.info.email,
          is_special: true
        },
        entry_ticket_status: "valid",
        role: participant.role,
        food_coupons: {
          morning:
            data.food_available && data.food_options?.morning
              ? 'available'
              : 'not_applicable',
          noon:
            data.food_available && data.food_options?.noon
              ? 'available'
              : 'not_applicable',
          evening:
            data.food_available && data.food_options?.evening
              ? 'available'
              : 'not_applicable'
        }
      });

      const qrBase64 = await generateQRCode({
        registration_id: registration.id,
        event_id: data.id as string,
        role: participant.role,
        email: participant.info.email
      });

      const emailHtml = generateEventInvitationTemplate(
        data.organizer?.name!,
        participant.role,
        {
          title: data.title,
          description: data.description,
          location: data.location,
          floor_details: data.floor_details,
          date: data.date,
          food_available: data.food_available,
          food_options: data.food_options
        }
      );
      await this._emailService.sendInvitationMail({
        to: participant.info.email,
        subject: `🎫 Your Ticket for ${data.title}`,
        html: emailHtml,
        qrBase64
      });
    }
  }
}
