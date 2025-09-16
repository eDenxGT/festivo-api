import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { ICreateEventUseCase } from '../../domain/usecaseInterfaces/event/create-event-usecase.interface';
import { CreateEventDTO } from '../../application/dtos/event/input/create-event.dto';
import { handleSuccessResponse } from '../../shared/utils/helpers/response.handler';
import { HTTP_STATUS } from '../../shared/constants';
import { SUCCESS_MESSAGES } from '../../shared/constants/success-messages.constants';
import { CustomRequest } from '../middlewares/auth.middleware';
import { IGetEventsForOrganizerUseCase } from '../../domain/usecaseInterfaces/event/get-events-for-organizer.usecase';
import { IGetEventByIdUseCase } from '../../domain/usecaseInterfaces/event/get-event-by-id-usecase.interface';
import { AppError } from '../../shared/errors/AppError';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages.constants';
import { EditEventDTO } from '../../application/dtos/event/input/edit-event.dto';
import { IUpdateEventUseCase } from '../../domain/usecaseInterfaces/event/update-event-usecase.interface';
import { IGetAllEventsForUserUseCase } from '../../domain/usecaseInterfaces/event/get-all-events-for-user-usecase.interface';
import { IRegisterEventUseCase } from '../../domain/usecaseInterfaces/event/register-event-usecase.interface';
import { IGetRegistrationDetails } from '../../domain/usecaseInterfaces/event/get-registration-details-usecase.interface';
import { IUpdateRegistrationStatusUseCase } from '../../domain/usecaseInterfaces/event/update-registration-status-usecase.interface';

@injectable()
export class EventController {
  constructor(
    @inject('ICreateEventUseCase')
    private _createEventUseCase: ICreateEventUseCase,
    @inject('IGetEventsForOrganizerUseCase')
    private _getEventsForOrganizerUseCase: IGetEventsForOrganizerUseCase,
    @inject('IGetEventByIdUseCase')
    private _getEventByIdUseCase: IGetEventByIdUseCase,
    @inject('IUpdateEventUseCase')
    private _updateEventUseCase: IUpdateEventUseCase,
    @inject('IGetAllEventsForUserUseCase')
    private _getAllEventsForUserUseCase: IGetAllEventsForUserUseCase,
    @inject('IRegisterEventUseCase')
    private _registerEventUseCase: IRegisterEventUseCase,
    @inject('IGetRegistrationDetails')
    private _getRegistrationDetails: IGetRegistrationDetails,
    @inject('IUpdateRegistrationStatusUseCase')
    private _updateRegistrationStatusUseCase: IUpdateRegistrationStatusUseCase
  ) {}

  createEvent = async (req: Request, res: Response) => {
    const data: CreateEventDTO = req.body;

    const userData = (req as CustomRequest).user;

    await this._createEventUseCase.execute({
      ...data,
      organizer_id: userData.id
    });

    handleSuccessResponse(
      res,
      HTTP_STATUS.CREATED,
      SUCCESS_MESSAGES.EVENT_CREATION_SUCCESS
    );
  };

  getEventsForOrganizer = async (req: Request, res: Response) => {
    const organizer_id = (req as CustomRequest).user.id;
    const events =
      await this._getEventsForOrganizerUseCase.execute(organizer_id);

    handleSuccessResponse(
      res,
      HTTP_STATUS.OK,
      SUCCESS_MESSAGES.DATA_FETCHING_SUCCESS,
      events
    );
  };

  getEventById = async (req: Request, res: Response) => {
    const event_id = req.params['event_id'];

    if (!event_id) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.INVALID_PARAMS,
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const event = await this._getEventByIdUseCase.execute(event_id);

    handleSuccessResponse(
      res,
      HTTP_STATUS.OK,
      SUCCESS_MESSAGES.DATA_FETCHING_SUCCESS,
      event
    );
  };

  updateEvent = async (req: Request, res: Response) => {
    const data: EditEventDTO = req.body;
    await this._updateEventUseCase.execute(data);

    handleSuccessResponse(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.UPDATE_SUCCESS);
  };

  getAllEventsForUser = async (req: Request, res: Response) => {
    const search = req.query['search']?.toString() || '';
    const events = await this._getAllEventsForUserUseCase.execute(search);

    handleSuccessResponse(
      res,
      HTTP_STATUS.OK,
      SUCCESS_MESSAGES.DATA_FETCHING_SUCCESS,
      events
    );
  };

  registerEvent = async (req: Request, res: Response) => {
    const { event_id } = req.body;
    const user_id = (req as CustomRequest).user.id;
    if (!event_id || !user_id) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.INVALID_PARAMS,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await this._registerEventUseCase.execute({ event_id, user_id });

    handleSuccessResponse(
      res,
      HTTP_STATUS.CREATED,
      SUCCESS_MESSAGES.REGISTRATION_SUCCESSFUL
    );
  };

  getRegistrationDetails = async (req: Request, res: Response) => {
    const registration_id = req.params['registration_id'];
    if (!registration_id)
      throw new AppError(
        ERROR_MESSAGES.CLIENT.INVALID_PARAMS,
        HTTP_STATUS.BAD_REQUEST
      );

    const registration =
      await this._getRegistrationDetails.execute(registration_id);

    handleSuccessResponse(
      res,
      HTTP_STATUS.OK,
      SUCCESS_MESSAGES.DATA_FETCHING_SUCCESS,

      registration
    );
  };

  updateRegistrationStatus = async (req: Request, res: Response) => {
    const { registration_id } = req.params;

    const type = String(req.query.type) as 'food_coupon' | 'entry_ticket';
    const food_field = String(req.query.food_field) as
      | 'morning'
      | 'noon'
      | 'evening';

    if (!type || !registration_id) {
      throw new AppError(
        ERROR_MESSAGES.CLIENT.INVALID_PARAMS,
        HTTP_STATUS.BAD_REQUEST
      );
    }

    await this._updateRegistrationStatusUseCase.execute({
      registration_id,
      type,
      food_field
    });

    handleSuccessResponse(res, HTTP_STATUS.OK, SUCCESS_MESSAGES.UPDATE_SUCCESS);
  };
}
