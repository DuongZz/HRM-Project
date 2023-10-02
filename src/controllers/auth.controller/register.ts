import { ROLE_TYPE } from '@/typeorm/entities/users/types';
import { JwtPayload } from '@/types/JwtPayload';
import { createJwtToken } from '@/utils/createJwtToken';
import { User } from '@/typeorm/entities/users/User';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ where: { email } });

    if (user) {
      const customError = new CustomError(400, 'General', 'User already exists', [
        `Email '${user.email}' already exists`,
      ]);
      return next(customError);
    }
    try {
      const newUser = new User();
      newUser.email = email;
      newUser.password = password;
      newUser.hashPassword();
      await userRepository.save(newUser);

      const tokenPayload: JwtPayload = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role as ROLE_TYPE,
        created_at: new Date(),
      };
      const accessToken = createJwtToken(tokenPayload);
      res.send({ newUser, accessToken });

      res.customSuccess(200, 'User successfully created.');
    } catch (err) {
      console.log('err:', err);
      const customError = new CustomError(400, 'Raw', `User '${email}' can't be created`, null, err);
      return next(customError);
    }
  } catch (err) {
    console.log('🚀 ~ file: register.ts:36 ~ register ~ err:', err);
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
