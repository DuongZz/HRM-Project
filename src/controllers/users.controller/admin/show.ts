import { User } from '@/typeorm/entities/users/User';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne(id, {
      select: ['id', 'username', 'name', 'email', 'role', 'language', 'phoneNumber', 'created_at', 'updated_at'],
    });

    if (!user) {
      res.status(404).json('User not found');
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
