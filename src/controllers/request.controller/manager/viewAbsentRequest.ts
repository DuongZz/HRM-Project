import { AbsentRequest } from '@/typeorm/entities/users/AbsentRequest';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { NextFunction } from 'express';
import { MoreThanOrEqual, getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { requestViewWithIdFilter } from '@/services/request.service/viewRequest.service/requestViewWithIdFilter';
import { requestAbsent } from '../user/requestAbsent';

export const viewAbsentRequest = async (req: Request, res: Response, next: NextFunction) => {
  const userInfo = req.jwtPayload.role;
  if (userInfo == 'MANAGER') {
    const id = req.params.id;
    try {
      const absentRequestLists = await requestViewWithIdFilter(id);

      res.customSuccess(200, 'List of absent requests', absentRequestLists);
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `Can't retrieve list of requests.`, null, err);
      return next(customError);
    }
  } else {
    if (req.params.id != req.jwtPayload.id) {
      const customError = new CustomError(
        403,
        'Raw',
        `You cannot access these resources because of lacking authorization`,
        null,
      );
      return next(customError);
    }
    const id = req.jwtPayload.id;
    try {
      const absentRequestLists = await requestViewWithIdFilter(id);

      res.customSuccess(200, 'List of absent requests', absentRequestLists);
    } catch (err) {
      const customError = new CustomError(400, 'Raw', `Can't retrieve list of requests.`, null, err);
      return next(customError);
    }
  }
};

// const absentRequestLists1 = await absentRequestRepository.find({
//   // relations: {
//   //   users: true,
//   // },
// where: {
//   user: {
//     id: 18,
//   },
// },
// });
