import { ABSENT_REQUEST } from '@/enum/requestEnums';
import { AbsentRequest } from '@/typeorm/entities/users/AbsentRequest';
import { NextFunction } from 'express';
import { Repository } from 'typeorm';

export const checkIfRequestIsAcceptedOrNot = async (requestFind: AbsentRequest) => {
  if (requestFind.is_accepted == ABSENT_REQUEST.APPROVED || requestFind.is_accepted == ABSENT_REQUEST.REJECTED) {
    return true;
  }
  return false;
};
