import PathAbsentRequest from './absentRequest';
import PathAuth from './authentication';
export const PathObject = {
  paths: {
    ...PathAbsentRequest,
    ...PathAuth,
  },
};
