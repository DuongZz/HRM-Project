import { getRepository } from 'typeorm';
import { Device } from '@/typeorm/entities/users/device';
import { DeviceUser } from '@/typeorm/entities/users/deviceUser';
import { DEVICE_STATUS } from '@/typeorm/entities/users/types';

export const returnDeviceService = async (deviceId: string) => {
  const deviceRepository = getRepository(Device);

  try {
    const device = await deviceRepository.findOne(deviceId);
    if (device.id) {
      const deviceUserRepository = getRepository(DeviceUser);
      const deviceUser = await deviceUserRepository.findOne({ where: { device: device } });
      if (deviceUser) {
        await deviceUserRepository.remove(deviceUser);
        device.deviceUsers = null;
        device.device_status = DEVICE_STATUS.AVAILABLE;
        device.quantity += 1;
        await deviceRepository.save(device);
        return 'Device returned successfully';
      } else {
        throw new Error('Device not borrowed by any user');
      }
    } else {
      throw new Error('Invalid device ID');
    }
  } catch (err) {
    throw err;
  }
};
