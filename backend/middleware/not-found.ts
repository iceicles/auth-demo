import { StatusCodes } from "http-status-codes";

export const notFoundMW = (req:any, res:any) => res.status(StatusCodes.NOT_FOUND).send('Route does not exist');