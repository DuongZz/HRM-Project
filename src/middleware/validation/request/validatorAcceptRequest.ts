import { CustomError } from '@/utils/response/custom-error/CustomError';
import { ErrorValidation } from '@/utils/response/custom-error/types';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { ABSENT_REQUEST } from '@/enum/requestEnums';
import validator from 'validator';
import { checkFalsy } from '../auth/validatorFalsy';
import { REQUEST_VALIDATE } from '@/constants/validateConstants';

export const validatorAcceptRequest = async (req: Request, res: Response, next: NextFunction) => {
  const { is_accepted } = req.body;

  const errorsValidation: ErrorValidation[] = [];
  const arrayAbsentRequestFromEnum = Object.values(ABSENT_REQUEST);
  if (validator.isEmpty(is_accepted)) {
    errorsValidation.push({ accepted_status: REQUEST_VALIDATE.CONTENT.IS_ACCEPTED_EMPTY });
  }

  if (!arrayAbsentRequestFromEnum.some((enumValue) => enumValue == is_accepted)) {
    errorsValidation.push({ accepted_status: REQUEST_VALIDATE.CONTENT.IS_ACCEPTED_INVALID });
  }

  if (arrayAbsentRequestFromEnum.some((enumValue) => enumValue == 'PENDING') && is_accepted == 'PENDING') {
    errorsValidation.push({ accepted_status: REQUEST_VALIDATE.CONTENT.PENDING_REQUEST_PROHIBIT });
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
