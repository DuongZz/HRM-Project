import { User } from '@/typeorm/entities/users/User';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { ROLE_TYPE } from '@/typeorm/entities/users/types';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  let id = req.jwtPayload.id;
  const role = req.jwtPayload.role;
  const passedId = req.params.id;
  const editInfo = req.body;
  if (role == ROLE_TYPE.MANAGER) {
    id = passedId;
  }

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', `User with id:${id} not found.`, ['User not found.']);
      return next(customError);
    }

    const newUser = { ...user, ...editInfo };
    newUser.id = id; // Tranh bi modify o trong body

    // for (let i = 0, i < modifiedUserDetails)

    // user.username = username;
    // user.name = name;
    // user.email = email;
    // user.role = role;
    // user.language = language;
    // user.created_at = created_at;
    // user.updated_at = updated_at;

    try {
      await userRepository.save(newUser);
      res.customSuccess(200, 'User successfully saved.', newUser);
    } catch (err) {
      const customError = new CustomError(409, 'Raw', `User '${user.email}' can't be saved.`, null, err);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
