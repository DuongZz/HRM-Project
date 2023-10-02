import loginSWG from './loginSWG';
import registerSWG from './registerSWG';
const PathAuth = {
  '/auth/login': {
    ...loginSWG,
  },
  '/auth/register': {
    ...registerSWG,
  },
};
export default PathAuth;
