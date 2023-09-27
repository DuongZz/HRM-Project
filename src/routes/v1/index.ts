import { Router } from 'express';
import device from './device';
import auth from './auth';
import users from './users';
import request from './absentRequest';
import timekeeping from './timekeeping';
const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/devices', device);

router.use('/absent-request', request);
router.use('/timekeeping', timekeeping);
export default router;
