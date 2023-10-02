import { Router } from 'express';

import { list, show, edit, destroy } from '@/controllers/users.controller';
import { checkJwt } from '@/middleware/checkJwt';
import { checkRole } from '@/middleware/checkRole';
import { validatorEdit } from '@/middleware/validation/users';
import { ROLE_TYPE } from '@/typeorm/entities/users/types';

const router = Router();

router.get('/', [checkJwt, checkRole([ROLE_TYPE.MANAGER])], list);

router.get('/view/:id', [checkJwt, checkRole([ROLE_TYPE.MANAGER, ROLE_TYPE.HR], true)], show);

router.patch(
  '/:id([a-z0-9A-Z-]+)',
  [checkJwt, checkRole([ROLE_TYPE.MANAGER, ROLE_TYPE.EMPLOYEE, ROLE_TYPE.HR], true), validatorEdit],
  edit,
);

router.delete('/delete/:id', [checkJwt, checkRole([ROLE_TYPE.MANAGER], true)], destroy);

export default router;
