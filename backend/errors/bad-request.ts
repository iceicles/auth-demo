import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './index';

export class BadRequestError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}