//* ====== Module Imports ====== *//
import { container } from 'tsyringe';

import { DependencyInjection } from './index';

//* ====== Controller Imports ====== *//
import { AuthController } from '../../interface/controllers/auth.controller';
import { UserController } from '../../interface/controllers/user.controller';
import { EventController } from '../../interface/controllers/event.controller';

// Registering all registries using a single class
DependencyInjection.registerAll();

export const authController = container.resolve(AuthController);

export const userController = container.resolve(UserController);

export const eventController = container.resolve(EventController);
