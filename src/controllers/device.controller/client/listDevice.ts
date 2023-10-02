import { Device } from '@/typeorm/entities/users/device';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

export const listDevice = async (req: Request, res: Response) => {
  const deviceRepository = getRepository(Device);
  try {
    const devices = await deviceRepository.find({
      select: ['id', 'name_device', 'device_status', 'description', 'quantity'],
    });
    res.status(200).json(devices);
  } catch (err) {
    res.status(400).json(err);
  }
};
