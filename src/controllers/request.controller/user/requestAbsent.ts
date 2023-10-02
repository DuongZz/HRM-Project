import { Request, Response, NextFunction } from 'express';
import { AbsentRequest } from '@/typeorm/entities/users/AbsentRequest';
import { getRepository } from 'typeorm';
import { User } from '@/typeorm/entities/users/User';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { createAbsentRequestServiceByEmployee } from '@/services/request.service/createRequest.service/createAbsentRequestServiceByEmployee';
import { saveRequestContent } from '@/services/request.service/createRequest.service/saveRequestContent';

export const requestAbsent = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.jwtPayload.id;
  const requestContent = req.body;
  const userRepository = getRepository(User);
  const absentRequestRepository = getRepository(AbsentRequest);

  try {
    const user = await userRepository.findOne({ where: { id } });
    // 1. Create Request Absent based on information that user sent.
    const requestAbsent = await createAbsentRequestServiceByEmployee(user, absentRequestRepository, requestContent);

    // 2. Save changes to the existing object which satisfied condition to the database,

    saveRequestContent(absentRequestRepository, requestAbsent);

    res.customSuccess(201, 'Successfully created', requestAbsent);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
