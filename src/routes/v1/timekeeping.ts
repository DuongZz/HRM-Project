import { checkJwt } from '@/middleware/checkJwt';
import { checkRole } from '@/middleware/checkRole';
import { checkFileExtension } from '@/middleware/validation/timekeepingFile/checkExtension';
import { ROLE_TYPE } from '@/typeorm/entities/users/types';
import { NextFunction, Request, Response, Router } from 'express';
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
  (req: Request, res: Response, next: NextFunction) => {
    // const test = xlsx.readFile(req.file.originalname);
    // console.log(test);
    console.log(req.file);

    const ws = xlsx.read(req.file.buffer);
    const sheet = ws.Sheets[ws.SheetNames[0]];

    const records = xlsx.utils.sheet_to_json(ws.Sheets[ws.SheetNames[0]]);
    // records.forEach((dailyRecord: any) => {
    //   // for (const key in dailyRecord) console.log(key);
    // });
    console.log(records);
    console.log(new Date(Date.UTC(0, 0, records[0]['Ngày'] - 1)).getMonth());
    //console.log(Date.parse(records[0]['Ngày']).ge);
    res.json(1);
  },
);
export default router;
