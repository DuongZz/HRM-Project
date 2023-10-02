import { PASSWORD_MIN_CHAR } from '@/constants/validateConstants';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { ErrorValidation } from '@/utils/response/custom-error/types';
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const validatorRegister = (req: Request, res: Response, next: NextFunction) => {
  let { email, password, passwordConfirm } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  email = !email ? '' : email;
  password = !password ? '' : password;
  passwordConfirm = !passwordConfirm ? '' : passwordConfirm;

  if (!validator.isEmail(email)) {
    errorsValidation.push({ email: 'Email is invalid' });
  }

  if (validator.isEmpty(email)) {
    errorsValidation.push({ email: 'Email is required' });
  }

  if (validator.isEmpty(password)) {
    errorsValidation.push({ password: 'Password is required' });
  }

  if (!validator.isLength(password, { min: PASSWORD_MIN_CHAR })) {
    errorsValidation.push({
      password: `Password must be at least ${PASSWORD_MIN_CHAR} characters`,
    });
  }

  if (validator.isEmpty(passwordConfirm)) {
    errorsValidation.push({ passwordConfirm: 'Confirm password is required' });
  }

  if (!validator.equals(password, passwordConfirm)) {
    errorsValidation.push({ passwordConfirm: 'Passwords must match' });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Register validation error', null, null, errorsValidation);
    console.log('🚀 ~ file: validatorRegister.ts:43 ~ validatorRegister ~ customError:', customError);
    throw customError;
  }
  return next();
};
