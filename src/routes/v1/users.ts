import { Router } from 'express';

import { list, show, edit, destroy } from '@/controllers/users.controller';
import { checkJwt } from '@/middleware/checkJwt';
import { checkRole } from '@/middleware/checkRole';
import { validatorEdit } from '@/middleware/validation/users';
import { ROLE_TYPE } from '@/typeorm/entities/users/types';
import { validatorRequest } from '@/middleware/validation/request/validatorRequest';
import { requestAbsent } from '@/controllers/request.controller/user/requestAbsent';
import { checkAbsentRequest } from '@/controllers/request.controller/manager/checkAbsentRequest';

const router = Router();

router.get('/', [checkJwt, checkRole([ROLE_TYPE.MANAGER])], list);

router.get('/:id([0-9]+)', [checkJwt, checkRole([ROLE_TYPE.MANAGER], true)], show);

router.patch(
  '/:id([0-9]+)',
  [checkJwt, checkRole([ROLE_TYPE.MANAGER, ROLE_TYPE.EMPLOYEE, ROLE_TYPE.HR], true), validatorEdit],
  edit,
);

router.delete('/:id([0-9]+)', [checkJwt, checkRole([ROLE_TYPE.MANAGER], true)], destroy);

export default router;
