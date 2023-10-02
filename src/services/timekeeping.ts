import { ErrorMessage } from '@/enum/errorMessage';
import { ErrorType } from '@/enum/errorType';
import { ExcelColumn } from '@/enum/timeKeepingExcelColumn';
import { Timekeeping } from '@/typeorm/entities/users/Timekeeping';
import { DailyCheckInInfo } from '@/types/DailyCheckInInfo';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { getRepository } from 'typeorm';

const saveTimekeepingRecord = async (data: Timekeeping) => {
  try {
    const timekeepingRepository = getRepository(Timekeeping);
    await timekeepingRepository.save(data);
  } catch (error) {
    throw new CustomError(500, ErrorType.GENERAL, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
const getDataFromExcelFile = (monthlyRecord: unknown[]): DailyCheckInInfo[] => {
  const monthlyCheckInInfo: DailyCheckInInfo[] = [];
  monthlyRecord.forEach((dailyRecord: unknown) => {
    const date = dailyRecord[ExcelColumn.date];
    const checkIn: string[] = [];
    const totalCheckIn = getTotalDailyCheckIn(dailyRecord);
    for (let i = 1; i <= totalCheckIn; i++) {
      checkIn[i - 1] = dailyRecord[i];
    }
    monthlyCheckInInfo.push({ date, checkIn });
  });
  return monthlyCheckInInfo;
};
const getTotalDailyCheckIn = (dailyRecord: unknown): number => {
  const keys = Object.keys(dailyRecord);
  // let result = 0;
  // keys.forEach((key) => {
  //   if (!isNaN(parseInt(key))) result += 1;
  // });
  return keys.length - 6;
};
const validateField = (firstRecord: unknown) => {
  const id = firstRecord[ExcelColumn.id];
  const name = firstRecord[ExcelColumn.name];
  const excelDate = firstRecord[ExcelColumn.date];
  const num = firstRecord[ExcelColumn.num];
  const day = firstRecord[ExcelColumn.day];
  const from = firstRecord[ExcelColumn.from];
  if (!id || !name || !excelDate || !num || !day || !from)
    throw new CustomError(400, ErrorType.VALIDATION, ErrorMessage.INVALID_TIMEKEEPING_FILE);
  else return { id, name, excelDate };
};
const findTimekeepingRecordByMonth = (id: string, month: number, year: number): Promise<Timekeeping> => {
  try {
    const timekeepingRepository = getRepository(Timekeeping);
    return timekeepingRepository.findOne({
      where: {
        id,
        month,
        year,
      },
    });
  } catch (error) {
    throw new CustomError(500, ErrorType.GENERAL, ErrorMessage.INTERNAL_SERVER_ERROR);
  }
};
const getMonthInExcel = (excelDate: string): number => parseInt(excelDate.split('-')[1]);
const getYearInExcel = (excelDate: string): number => parseInt(excelDate.split('-')[0]);

export {
  saveTimekeepingRecord,
  getDataFromExcelFile,
  getMonthInExcel,
  getYearInExcel,
  validateField,
  findTimekeepingRecordByMonth,
};
