import { Device } from '@/typeorm/entities/users/device';
import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
export const editDevice = async (req: Request, res: Response) => {
  const { name_device, device_status, description, quantity } = req.body;
  const deviceRepository = getRepository(Device);
  const id = req.body.id;

  try {
    const updatedDevice = {
      name_device: name_device,
      device_status: device_status,
      description: description,
      quantity: quantity,
    };
    const deviceIdUpdate = id;
    await deviceRepository.update(deviceIdUpdate, updatedDevice);
    res.status(200).json(updatedDevice);
  } catch (err) {
    res.status(500).json(err);
  }
};
