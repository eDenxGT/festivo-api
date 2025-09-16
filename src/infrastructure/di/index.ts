//* ====== Registry Imports ====== *//
import logger from '../../shared/utils/logger';
import { RepositoryRegistry } from './repository.registry';
import { ServiceRegistry } from './service.registry';
import { UseCaseRegistry } from './usecase.registry';

// Registering all registries using a single class
export class DependencyInjection {
  static registerAll(): void {
    UseCaseRegistry.registerUseCases();
    RepositoryRegistry.registerRepositories();
    ServiceRegistry.registerServices();

    logger.log('Dependency Injection Registries Loaded');
  }
}
