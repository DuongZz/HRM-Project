import { Router } from 'express';
import {
  addDevice,
  listDevice,
  deleteDevice,
  borrowDeviceController,
  returnDeviceController,
  editDevice,
} from '@/controllers/device.controller';
import { checkDeviceExistence } from '@/middleware/validation/device/checkDeviceExistence';
import { checkRole } from '@/middleware/checkRole';
import { ROLE_TYPE } from '@/typeorm/entities/users/types';
import { checkJwt } from '@/middleware/checkJwt';
const router = Router();

router.post('/add', [checkJwt, checkRole([ROLE_TYPE.MANAGER], true)], addDevice);
router.get('/', [checkJwt, checkRole([ROLE_TYPE.EMPLOYEE, ROLE_TYPE.HR, ROLE_TYPE.MANAGER])], listDevice);

router.post(
  '/borrow',
  [checkJwt, checkRole([ROLE_TYPE.EMPLOYEE, ROLE_TYPE.HR, ROLE_TYPE.MANAGER])],
  checkDeviceExistence,
  borrowDeviceController,
);

router.post(
  '/return',
  [checkJwt, checkRole([ROLE_TYPE.EMPLOYEE, ROLE_TYPE.HR, ROLE_TYPE.MANAGER])],
  checkDeviceExistence,
  returnDeviceController,
);

router.post('/edit-device', [checkJwt, checkRole([ROLE_TYPE.MANAGER])], editDevice);

router.delete('/delete/:id', [checkJwt, checkRole([ROLE_TYPE.MANAGER])], checkDeviceExistence, deleteDevice);
export default router;
