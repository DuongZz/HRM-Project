import { Request, Response, NextFunction } from 'express';
import { AbsentRequest } from '@/typeorm/entities/users/AbsentRequest';
import { getRepository } from 'typeorm';
import { User } from '@/typeorm/entities/users/User';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { request } from 'http';
import { REQUEST_VALIDATE } from '@/constants/validateConstants';
import { ABSENT_REQUEST, IIsAccepted } from '@/enum/requestEnums';
import { checkIfRequestIsAcceptedOrNot } from '@/services/request.service/handleRequest.service/checkIfRequestIsAcceptedOrNot';
import { updateRequestStatus } from '@/services/request.service/handleRequest.service/updateRequestStatus';

export const handleAbsentRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const managerName = req.jwtPayload.name;
    const { is_accepted } = req.body;
    const id = req.params.id;
    console.log(id);
    const absentRequestRepository = getRepository(AbsentRequest);
    let requestFind = await absentRequestRepository.findOne({ where: { id } });
    // 1. check if status is approved or rejected
    // 2. If pending, skip and go to code below this code.
    if (await checkIfRequestIsAcceptedOrNot(requestFind)) {
      res.status(406).send(REQUEST_VALIDATE.CONTENT.IS_ACCEPTED_EXISTED);
    }

    // 3. update status that get the post;
    requestFind = await updateRequestStatus(managerName, is_accepted, id, requestFind);
    res.customSuccess(200, 'handle request successfully', requestFind);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

// interface ITableDefault {
//   id: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface ITable {
//   a: string;
//   b: string;
//   c: string;
//   d: string;
// }

// type IExtends = Partial<ITable> & Omit<ITableDefault, 'a' | 'b'>;

// type ICreateTable = IExtends;
