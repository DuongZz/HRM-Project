import { ErrorMessage } from '@/enum/errorMessage';
import { ErrorType } from '@/enum/errorType';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { NextFunction, Request, Response } from 'express';

export const checkFileExtension = (req: Request, res: Response, next: NextFunction) => {
  const { originalname } = req.file;
  const arrayWhenSplitName: string[] = originalname.split('.');
  const extension = arrayWhenSplitName[arrayWhenSplitName.length - 1];
  if (extension === 'xlsx') return next();
  else return next(new CustomError(400, ErrorType.VALIDATION, ErrorMessage.NOT_AN_EXCEL_FILE));
};
