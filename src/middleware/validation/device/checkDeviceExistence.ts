import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Device } from '@/typeorm/entities/users/device';

export const checkDeviceExistence = async (req: Request, res: Response, next: NextFunction) => {
  const deviceRepository = getRepository(Device);
  const id = req.params.id;

  try {
    const device = await deviceRepository.findOne(id);

    if (!device) {
      res.status(404).json('Device Not Found');
    }

    req.device = device;
    next();
  } catch (err) {
    res.status(500).json(err);
  }
};
