import { CustomError } from '@/utils/response/custom-error/CustomError';
import { ErrorValidation } from '@/utils/response/custom-error/types';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { MAX_DAY_LATE, REQUEST_VALIDATE, isDateInvalidOrNot } from '@/constants/validateConstants';
import { MAIN_POINT_MIN_CHAR, REASON_MAX_CHAR, REASON_MIN_CHAR } from '@/constants/validateConstants';

export const validatorRequest = async (req: Request, res: Response, next: NextFunction) => {
  const absentRequestBody = req.body;
  const requestedTimeBegin = isDateInvalidOrNot(req.body.date_of_absence_begin);
  const requestedTimeEnd = isDateInvalidOrNot(req.body.date_of_absence_end);
  const now = Date.now();
  // console.log(absentRequestBody);
  // console.log({
  //   mainLength: absentRequestBody.main_point.length,
  //   doaLength: absentRequestBody.date_of_absence.length,
  //   reasonLength: absentRequestBody.reason.length,
  // });
  const errorsValidation: ErrorValidation[] = [];

  // 1. Form

  if (validator.isEmpty(absentRequestBody.main_point)) {
    errorsValidation.push({ main_point: REQUEST_VALIDATE.CONTENT.MAIN_POINT_EMPTY });
  }

  if (validator.isEmpty(absentRequestBody.date_of_absence_begin)) {
    errorsValidation.push({ date_of_absence: REQUEST_VALIDATE.CONTENT.DATE_OF_ABSENCE_BEGIN_EMPTY });
  }

  if (validator.isEmpty(absentRequestBody.date_of_absence_end)) {
    errorsValidation.push({ date_of_absence: REQUEST_VALIDATE.CONTENT.DATE_OF_ABSENCE_END_EMPTY });
  }

  if (!(requestedTimeBegin.parsedDate && requestedTimeEnd.parsedDate)) {
    errorsValidation.push({ date_of_absence: REQUEST_VALIDATE.DATE.INVALID_DATE });
  }

  // Maximum 5 day late request count from the past if the request was sent after absent.
  if (requestedTimeBegin.getTime < now - MAX_DAY_LATE || requestedTimeEnd.getTime < now - MAX_DAY_LATE) {
    errorsValidation.push({ date_of_absence: REQUEST_VALIDATE.DATE.INVALID_PAST_REQUESTED_DATE });
  }

  if (requestedTimeBegin.getTime > requestedTimeEnd.getTime) {
    errorsValidation.push({ date_of_absence: REQUEST_VALIDATE.DATE.UNSUITABLE_END_DATE });
  }

  if (validator.isEmpty(absentRequestBody.reason)) {
    errorsValidation.push({ reason: REQUEST_VALIDATE.CONTENT.REASON_EMPTY });
  }

  if (!validator.isLength(absentRequestBody.main_point, { min: MAIN_POINT_MIN_CHAR })) {
    errorsValidation.push({ main_point: `Main Point must have at least ${MAIN_POINT_MIN_CHAR}` });
  }

  if (!validator.isLength(absentRequestBody.reason, { min: REASON_MIN_CHAR })) {
    errorsValidation.push({ main_point: `Reason field must have at least ${REASON_MIN_CHAR}` });
  }

  if (!validator.isLength(absentRequestBody.reason, { max: REASON_MAX_CHAR })) {
    errorsValidation.push({ main_point: `Reason field can't excess ${REASON_MAX_CHAR} character` });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(
      400,
      'Validation',
      'Make absent request validation error',
      null,
      null,
      errorsValidation,
    );
    return next(customError);
  }
  return next();
};
