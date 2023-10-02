import { ErrorMessage } from '@/enum/errorMessage';
import { ErrorType } from '@/enum/errorType';
import { SuccessMessage } from '@/enum/successMessage';
import { findTimekeepingRecordByMonth } from '@/services/timekeeping';
import { DailyCheckInInfo } from '@/types/DailyCheckInInfo';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { isMonth, isYear } from '@/utils/validate';
import { NextFunction, Request, Response } from 'express';

export const getTimekeepingRecordByMonth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, month, year } = req.query;
    if (!id || !month || !year) throw new CustomError(400, ErrorType.GENERAL, ErrorMessage.BAD_REQUEST);
    if (!isMonth(month.toString()) || !isYear(year.toString()))
      throw new CustomError(400, ErrorType.VALIDATION, ErrorMessage.INVALID_DATE);
    const monthlyCheckInRecord = await findTimekeepingRecordByMonth(
      id.toString(),
      parseInt(month.toString()),
      parseInt(year.toString()),
    );
    return res.customSuccess(200, SuccessMessage.OK, monthlyCheckInRecord);
  } catch (error) {
    return next(error);
  }
};
export const getTimekeepingRecordByDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.jwtPayload);
    const { id } = req.query;
    if (!id) throw new CustomError(400, ErrorType.GENERAL, ErrorMessage.BAD_REQUEST);
    const date = req.query.date ? new Date(req.query.date.toString()) : new Date();
    if (date.toString() === 'Invalid Date') throw new CustomError(400, ErrorType.VALIDATION, ErrorMessage.INVALID_DATE);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const day = date.toJSON().split('T')[0];
    const monthlyCheckInRecord = await findTimekeepingRecordByMonth(id.toString(), month, year);
    if (!monthlyCheckInRecord) res.customSuccess(200, SuccessMessage.OK, []);
    const dailyCheckInRecord: DailyCheckInInfo = monthlyCheckInRecord.monthlyCheckInInfo.find(
      (dailyRecord) => dailyRecord.date === day,
    );
    const checkIn = dailyCheckInRecord.checkIn;
    return res.customSuccess(200, SuccessMessage.OK, checkIn);
  } catch (error) {
    return next(error);
  }
};
