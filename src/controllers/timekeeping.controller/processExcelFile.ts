import { NextFunction, Request, Response } from 'express';

const processTimekeepingFile = (req: Request, res: Response, next: NextFunction) => {
  // const test = xlsx.readFile(req.file.originalname);
  // console.log(test);
  console.log(req.file);

  const ws = XLSX.read(req.file.buffer, { sheetRows: 1 });
  const sheet = ws.Sheets[ws.SheetNames[0]];

  const records = xlsx.utils.sheet_to_json(ws.Sheets[ws.SheetNames[0]], { header: 1 })[0];
  // records.forEach((dailyRecord: any) => {
  //   // for (const key in dailyRecord) console.log(key);
  // });
  console.log(records);
  res.json(1);
};
