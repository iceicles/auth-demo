import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './index';

export class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}