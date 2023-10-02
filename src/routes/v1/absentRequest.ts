import { Router } from 'express';

import { list, show, edit, destroy } from '@/controllers/users.controller';
import { checkJwt } from '@/middleware/checkJwt';
import { checkRole } from '@/middleware/checkRole';
import { validatorEdit } from '@/middleware/validation/users';
import { ROLE_TYPE } from '@/typeorm/entities/users/types';
import { validatorRequest } from '@/middleware/validation/request/validatorRequest';
import { requestAbsent } from '@/controllers/request.controller/user/requestAbsent';
import { viewAbsentRequest } from '@/controllers/request.controller/manager/viewAbsentRequest';
import { validatorAcceptRequest } from '@/middleware/validation/request/validatorAcceptRequest';
import { handleAbsentRequest } from '@/controllers/request.controller/manager/handleAbsentRequest';

const router = Router();

router.get(
  '/view',
  [checkJwt, checkRole([ROLE_TYPE.MANAGER, ROLE_TYPE.EMPLOYEE, ROLE_TYPE.HR], true)],
  viewAbsentRequest,
);

router.get(
  '/view/:id([a-z0-9A-Z-]+)',
  [checkJwt, checkRole([ROLE_TYPE.MANAGER, ROLE_TYPE.EMPLOYEE, ROLE_TYPE.HR], true)],
  viewAbsentRequest,
);

router.post('', [checkJwt, checkRole([ROLE_TYPE.EMPLOYEE, ROLE_TYPE.HR], true), validatorRequest], requestAbsent);

router.patch(
  '/request-handler/:id([a-z0-9A-Z-]+)',
  [checkJwt, checkRole([ROLE_TYPE.MANAGER], true), validatorAcceptRequest],
  handleAbsentRequest,
);

export default router;
