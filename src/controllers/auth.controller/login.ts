import { ROLE_TYPE } from '@/typeorm/entities/users/types';
import { User } from '@/typeorm/entities/users/User';
import { JwtPayload } from '@/types/JwtPayload';
import { createJwtToken } from '@/utils/createJwtToken';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(404, 'General', 'Not Found', ['Incorrect email or password']);
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role as ROLE_TYPE,
      created_at: user.created_at,
    };
    try {
      const token = createJwtToken(jwtPayload);
      res.customSuccess(200, 'Token successfully created.', `Bearer ${token}`);
    } catch (err) {
      const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
      return next(customError);
    }
  } catch (err) {
    console.log(err);
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
