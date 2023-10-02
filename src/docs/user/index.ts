import editUserInfoBySwagger from './editUserInfoSWG';

const PathUser = {
  '/users/{id}': {
    ...editUserInfoBySwagger,
  },
};

export default PathUser;
