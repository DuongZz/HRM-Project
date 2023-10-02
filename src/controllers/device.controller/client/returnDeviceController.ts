import { Request, Response } from 'express';
import { returnDeviceService } from '@/services/device.service/returnDeviceService';

export const returnDeviceController = async (req: Request, res: Response) => {
  const deviceId = req.params.id;

  try {
    const result = await returnDeviceService(deviceId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
