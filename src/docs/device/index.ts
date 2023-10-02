import addDeviceSWG from './addDeviceSWG';
import allDeviceSWG from './allDeviceSWG';
import deleteDeviceSWG from './deleteDeviceSWG';
const PathDevice = {
  '/devices/add': {
    ...addDeviceSWG,
  },
  '/devices/': {
    ...allDeviceSWG,
  },
  '/devices/delete/{id}': {
    ...deleteDeviceSWG,
  },
};
export default PathDevice;
