//* ====== Module Imports ====== *//
import { container } from 'tsyringe';

//* ====== Use Case Imports ====== *//
import { ISignUpUserUseCase } from '../../domain/usecaseInterfaces/auth/signup-user-usecase.interface';
import { SignUpUserUseCase } from '../../application/usecases/auth/signup-user.usecase';
import { ISignInUserUseCase } from '../../domain/usecaseInterfaces/auth/signin-user-usecase.interface';
import { SignInUserUseCase } from '../../application/usecases/auth/signin-user.usecase';
import { IRefreshTokenUseCase } from '../../domain/usecaseInterfaces/auth/refresh-token-usecase.interface';
import { RefreshTokenUseCase } from '../../application/usecases/auth/refresh-token.usecase';
import { ICreateEventUseCase } from '../../domain/usecaseInterfaces/event/create-event-usecase.interface';
import { CreateEventUseCase } from '../../application/usecases/event/create-event.usecase';
import { SendEventInvitationUseCase } from '../../application/usecases/event/send-event-invitation.usecase';
import { ISendEventInvitationUseCase } from '../../domain/usecaseInterfaces/event/send-event-invitation-usecase.interface';
import { EventRegistrationUseCase } from '../../application/usecases/event/event-registration.usecase';
import { IEventRegistrationUseCase } from '../../domain/usecaseInterfaces/event/event-registration-usecase.interface';
import { IGetEventsForOrganizerUseCase } from '../../domain/usecaseInterfaces/event/get-events-for-organizer.usecase';
import { GetEventsForOrganizerUseCase } from '../../application/usecases/event/get-events-for-organizer.usecase';
import { IGetEventByIdUseCase } from '../../domain/usecaseInterfaces/event/get-event-by-id-usecase.interface';
import { GetEventByIdUseCase } from '../../application/usecases/event/get-event-by-id.usecase';
import { IUpdateEventUseCase } from '../../domain/usecaseInterfaces/event/update-event-usecase.interface';
import { UpdateEventUseCase } from '../../application/usecases/event/update-event.usecase';
import { IGetAllEventsForUserUseCase } from '../../domain/usecaseInterfaces/event/get-all-events-for-user-usecase.interface';
import { GetAllEventsForUserUseCase } from '../../application/usecases/event/get-all-events-for-user.usecase';
import { IRegisterEventUseCase } from '../../domain/usecaseInterfaces/event/register-event-usecase.interface';
import { RegisterEventUseCase } from '../../application/usecases/event/register-event.usecase';
import { IGetRegistrationDetails } from '../../domain/usecaseInterfaces/event/get-registration-details-usecase.interface';
import { GetRegistrationDetails } from '../../application/usecases/event/get-registration-details.usecase';
import { UpdateRegistrationStatusUseCase } from '../../application/usecases/event/update-registration-status.usecase';
import { IUpdateRegistrationStatusUseCase } from '../../domain/usecaseInterfaces/event/update-registration-status-usecase.interface';

export class UseCaseRegistry {
  static registerUseCases(): void {
    container.register<ISignUpUserUseCase>('ISignUpUserUseCase', {
      useClass: SignUpUserUseCase
    });
    container.register<ISignInUserUseCase>('ISignInUserUseCase', {
      useClass: SignInUserUseCase
    });
    container.register<IRefreshTokenUseCase>('IRefreshTokenUseCase', {
      useClass: RefreshTokenUseCase
    });
    container.register<ICreateEventUseCase>('ICreateEventUseCase', {
      useClass: CreateEventUseCase
    });
    container.register<ISendEventInvitationUseCase>(
      'ISendEventInvitationUseCase',
      {
        useClass: SendEventInvitationUseCase
      }
    );
    container.register<IEventRegistrationUseCase>('IEventRegistrationUseCase', {
      useClass: EventRegistrationUseCase
    });
    container.register<IGetEventsForOrganizerUseCase>(
      'IGetEventsForOrganizerUseCase',
      {
        useClass: GetEventsForOrganizerUseCase
      }
    );
    container.register<IGetEventByIdUseCase>('IGetEventByIdUseCase', {
      useClass: GetEventByIdUseCase
    });
    container.register<IUpdateEventUseCase>('IUpdateEventUseCase', {
      useClass: UpdateEventUseCase
    });
    container.register<IGetAllEventsForUserUseCase>(
      'IGetAllEventsForUserUseCase',
      {
        useClass: GetAllEventsForUserUseCase
      }
    );
    container.register<IRegisterEventUseCase>('IRegisterEventUseCase', {
      useClass: RegisterEventUseCase
    });
    container.register<IGetRegistrationDetails>('IGetRegistrationDetails', {
      useClass: GetRegistrationDetails
    });
    container.register<IUpdateRegistrationStatusUseCase>(
      'IUpdateRegistrationStatusUseCase',
      {
        useClass: UpdateRegistrationStatusUseCase
      }
    );
  }
}
