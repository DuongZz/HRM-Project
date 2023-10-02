import PathAbsentRequest from './absentRequest';
import PathAuth from './authentication';
import PathDevice from './device';
export const PathObject = {
  paths: {
    ...PathAbsentRequest,
    ...PathAuth,
    ...PathDevice,
  },
};
