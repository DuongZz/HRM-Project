import { CustomError } from './../../../utils/response/custom-error/CustomError';
import { Device } from '@/typeorm/entities/users/device';
import { getRepository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';
export const editDevice = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const editDevice = req.body;
  const deviceRepository = getRepository(Device);
  try {
    const device = await deviceRepository.findOne({ where: { id } });
    if (!device) {
      const customError = new CustomError(404, 'General', 'Device not found');
      return next(customError);
    }
    const newDevice = { ...device, ...editDevice };
    newDevice.id = id;
    try {
      await deviceRepository.save(newDevice);
      res.customSuccess(200, 'Device successfully saved.', newDevice);
    } catch (err) {
      const customError = new CustomError(409, 'Raw', null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
