import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Device } from '@/typeorm/entities/users/device';
import { DEVICE_STATUS } from '@/typeorm/entities/users/types';
import { User } from '@/typeorm/entities/users/User';
export const borrowDevice = async (req: Request, res: Response) => {
  const deviceRepository = getRepository(Device);
  const device = req.device;
  const userId = req.jwtPayload.id;

  try {
    if (device.quantity > 0) {
      device.quantity -= 1;
      if (device.quantity === 0) {
        device.device_status = DEVICE_STATUS.UNAVAILABLE;
      }
      const userRepository = getRepository(User);
      const user = await userRepository.findOne(userId);
      device.user = user;
      await deviceRepository.save(device);
      return res.status(200).json('Device Borrowed Successfully');
    } else {
      return res.status(400).json('There are no more devices to borrow');
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
