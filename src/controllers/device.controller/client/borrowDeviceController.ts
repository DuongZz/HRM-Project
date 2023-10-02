import { Request, Response } from 'express';
import { borrowDeviceService } from '@/services/device.service/borrowDeviceService';

export const borrowDeviceController = async (req: Request, res: Response) => {
  const deviceId = req.params.id;
  const userId = req.jwtPayload.id;

  try {
    const result = await borrowDeviceService(deviceId, userId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
