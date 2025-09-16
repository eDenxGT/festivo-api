import { CreateEventDTO } from '../../application/dtos/event/input/create-event.dto';
import { EditEventDTO } from '../../application/dtos/event/input/edit-event.dto';
import {
  authController,
  eventController
} from '../../infrastructure/di/resolver';
import { decodeToken, verifyAuth } from '../middlewares/auth.middleware';
import { validateDTO } from '../middlewares/validate-dto.middleware';
import { BaseRoute } from './base/base.route';
import asyncHandler from 'express-async-handler';

export class PrivateRoutes extends BaseRoute {
  constructor() {
    super();
  }

  protected initializeRoutes(): void {
    //* ─────────────────────────────────────────────────────────────
    //*                 🛠️ Events Endpoints
    //* ─────────────────────────────────────────────────────────────
    this.router
      .route('/events')
      .post(
        verifyAuth,
        validateDTO(CreateEventDTO),
        asyncHandler(eventController.createEvent)
      )
      .get(verifyAuth, asyncHandler(eventController.getAllEventsForUser));

    this.router
      .route('/events/:event_id')
      .get(verifyAuth, asyncHandler(eventController.getEventById));

    this.router
      .route('/org/events')
      .get(verifyAuth, asyncHandler(eventController.getEventsForOrganizer))
      .put(
        verifyAuth,
        validateDTO(EditEventDTO),
        asyncHandler(eventController.updateEvent)
      );

    this.router
      .route('/events/registrations')
      .post(verifyAuth, asyncHandler(eventController.registerEvent));

    this.router
      .route('/events/registrations/:registration_id')
      .get(verifyAuth, asyncHandler(eventController.getRegistrationDetails))
      .patch(
        verifyAuth,
        asyncHandler(eventController.updateRegistrationStatus)
      );

    //* ─────────────────────────────────────────────────────────────
    //*                🛠️ Token Refreshing Endpoint
    //* ─────────────────────────────────────────────────────────────
    this.router.post(
      '/refresh-token',
      decodeToken,
      authController.handleTokenRefresh
    );

    this.router.post(
      '/logout',
      verifyAuth,
      asyncHandler(authController.logoutUser)
    );
  }
}
