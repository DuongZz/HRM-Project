import editUserInfoBySwagger from './editUserInfoSWG';
import getAllUserSWG from './getAllUserSWG';
import getUserByIdSWG from './getUserByIdSWG';
import deleteUserSWG from './deleteUserSWG';
const PathUser = {
  '/users/': {
    ...getAllUserSWG,
  },
  '/users/{id}': {
    ...getUserByIdSWG,
    ...deleteUserSWG,
    ...editUserInfoBySwagger,
  },
};
export default PathUser;
