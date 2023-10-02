// import { login, changePassword, register } from 'controllers/auth';
import { login, changePassword, register } from '@/controllers/auth.controller';
import { checkJwt } from '@/middleware/checkJwt';
import { checkRole } from '@/middleware/checkRole';
import { validatorLogin, validatorRegister, validatorChangePassword } from '@/middleware/validation/auth';
import { ROLE_TYPE } from '@/typeorm/entities/users/types';
import { Router } from 'express';

const router = Router();

router.post('/login', [validatorLogin], login);
router.post('/register', [checkJwt], checkRole([ROLE_TYPE.HR, ROLE_TYPE.MANAGER]), [validatorRegister], register);
router.post('/change-password', [checkJwt, validatorChangePassword], changePassword);

export default router;
