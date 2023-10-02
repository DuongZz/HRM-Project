import { getRepository } from 'typeorm';
import { Device } from '@/typeorm/entities/users/device';
import { User } from '@/typeorm/entities/users/User';
import { DeviceUser } from '@/typeorm/entities/users/deviceUser';
import { DEVICE_STATUS } from '@/typeorm/entities/users/types';

export const borrowDeviceService = async (deviceId: string, userId: string) => {
  const deviceRepository = getRepository(Device);

  try {
    const device = await deviceRepository.findOne(deviceId);
    if (device.quantity > 0) {
      device.quantity -= 1;
      if (device.quantity === 0) {
        device.device_status = DEVICE_STATUS.UNAVAILABLE;
      }
      const userRepository = getRepository(User);
      const user = await userRepository.findOne(userId);
      const deviceUserRepository = getRepository(DeviceUser);
      const deviceUser = new DeviceUser();
      deviceUser.user = user;
      deviceUser.device = device;
      await deviceUserRepository.save(deviceUser);
      await deviceRepository.save(device);
      return 'Device Borrowed Successfully';
    } else {
      throw new Error('There are no more devices to borrow');
    }
  } catch (err) {
    throw err;
  }
};
