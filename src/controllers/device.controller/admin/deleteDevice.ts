import { Device } from '@/typeorm/entities/users/device';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

export const deleteDevice = async (req: Request, res: Response, next: NextFunction) => {
  const deviceRepository = getRepository(Device);
  const device = req.device;
  try {
    deviceRepository.delete(device);
    res.customSuccess(200, 'Device successful delete', { id: device.id, name_device: device.name_device });
  } catch (err) {
    res.status(500).json(err);
  }
};
