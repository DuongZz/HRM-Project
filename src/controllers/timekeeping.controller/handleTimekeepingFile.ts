import { ErrorMessage } from '@/enum/errorMessage';
import { ErrorType } from '@/enum/errorType';
import { SuccessMessage } from '@/enum/successMessage';
import { ExcelColumn } from '@/enum/timeKeepingExcelColumn';
import {
  getDataFromExcelFile,
  getMonthInExcel,
  getYearInExcel,
  saveTimekeepingRecord,
  validateField,
} from '@/services/timekeeping';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { NextFunction, Request, Response } from 'express';
import XLSX, { WorkBook, WorkSheet } from 'xlsx';
const handleTimekeepingFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workBook: WorkBook = XLSX.read(req.file.buffer, { dateNF: 'yyyy-mm-dd' });
    const workSheet: WorkSheet = workBook.Sheets[workBook.SheetNames[0]];
    const monthlyRecord = XLSX.utils.sheet_to_json(workSheet, { raw: false });
    const firstRecord = monthlyRecord[0];
    const { id, name, excelDate } = validateField(firstRecord);
    const month = getMonthInExcel(excelDate);
    const year = getYearInExcel(excelDate);
    const monthlyCheckInInfo = getDataFromExcelFile(monthlyRecord);
    await saveTimekeepingRecord({ id, name, month, year, monthlyCheckInInfo });
    return res.customSuccess(200, SuccessMessage.OK);
  } catch (error) {
    if (error instanceof CustomError) return next(error);
    return next(new CustomError(500, ErrorType.GENERAL, ErrorMessage.INTERNAL_SERVER_ERROR));
  }
};

//Convert date in file excel to date in js
//new Date(Date.UTC(0, 0, excelDate - 1)).getMonth() + 1;
export { handleTimekeepingFile };
