//* ====== Module Imports ====== *//
import { container } from 'tsyringe';
import { IUserRepository } from '../../domain/repositoryInterfaces/users/user-repository.interface';
import { IOrganizerRepository } from '../../domain/repositoryInterfaces/users/organizer-repository.interface';
import { OrganizerRepository } from '../repositories/users/organizer.repository';
import { UserRepository } from '../repositories/users/user.repository';
import { IEventRepository } from '../../domain/repositoryInterfaces/event/event-repository.interface';
import { EventRepository } from '../repositories/event/event.repository';
import { RegistrationRepository } from '../repositories/registration/registration.repository';
import { IRegistrationRepository } from '../../domain/repositoryInterfaces/registration/registration-repository.interface';

//* ====== Repository Imports ====== *//

export class RepositoryRegistry {
  static registerRepositories(): void {
    container.register<IUserRepository>('IUserRepository', {
      useClass: UserRepository
    });
    container.register<IOrganizerRepository>('IOrganizerRepository', {
      useClass: OrganizerRepository
    });
    container.register<IEventRepository>('IEventRepository', {
      useClass: EventRepository
    });
    container.register<IRegistrationRepository>('IRegistrationRepository', {
      useClass: RegistrationRepository
    });
  }
}
