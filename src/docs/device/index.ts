import addDeviceSWG from './addDeviceSWG';
import allDeviceSWG from './allDeviceSWG';
import deleteDeviceSWG from './deleteDeviceSWG';
import borrowDeviceSWG from './borrowDeviceSWG';
import returnDeviceSWG from './returnDeviceSWG';
const PathDevice = {
  '/devices/add': {
    ...addDeviceSWG,
  },
  '/devices/': {
    ...allDeviceSWG,
  },
  '/devices/{id}': {
    ...deleteDeviceSWG,
    ...borrowDeviceSWG,
  },
  '/devices/return/{id}': {
    ...returnDeviceSWG,
  },
};
export default PathDevice;
