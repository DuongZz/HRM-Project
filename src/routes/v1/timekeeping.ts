import {
  getTimekeepingRecordByDate,
  getTimekeepingRecordByMonth,
} from '@/controllers/timekeeping.controller/getTimeKeepingRecord';
import { handleTimekeepingFile } from '@/controllers/timekeeping.controller/handleTimekeepingFile';
import { checkJwt } from '@/middleware/checkJwt';
import { checkRole } from '@/middleware/checkRole';
import { checkFileExtension } from '@/middleware/validation/timekeepingFile/checkExtension';
import { ROLE_TYPE } from '@/typeorm/entities/users/types';
import { Router } from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
const upload = multer();
const router = Router();
router.post(
  '/',
  checkJwt,
  checkRole([ROLE_TYPE.MANAGER]),
  upload.single('excel'),
  checkFileExtension,
  handleTimekeepingFile,
);
router.get('/searchByMonth', checkJwt, checkRole([ROLE_TYPE.MANAGER, ROLE_TYPE.HR]), getTimekeepingRecordByMonth);
router.get('/searchByDate', checkJwt, checkRole([ROLE_TYPE.MANAGER, ROLE_TYPE.HR]), getTimekeepingRecordByDate);

export default router;
