import { AbsentRequest } from '@/typeorm/entities/users/AbsentRequest';
import { Repository } from 'typeorm';
import { REQUEST_VALIDATE } from '@/constants/validateConstants';
import { ABSENT_REQUEST } from '@/enum/requestEnums';
import { User } from '@/typeorm/entities/users/User';
import { CustomError } from '@/utils/response/custom-error/CustomError';

export const createAbsentRequestServiceByEmployee = async (
  user: User,
  repo: Repository<AbsentRequest>,
  requestContent: AbsentRequest,
) => {
  try {
    return repo.create({
      main_point: requestContent.main_point,
      date_of_absence_begin: requestContent.date_of_absence_begin,
      date_of_absence_end: requestContent.date_of_absence_end,
      reason: requestContent.reason,
      request_date: REQUEST_VALIDATE.DATE.CURRENT_TIME,
      is_accepted: ABSENT_REQUEST.PENDING,
      approved_date: null,
      approved_by: null,
      user: user,
    });
  } catch (err) {
    console.error('Error while creating a request!');
    const newError = new CustomError(400, 'Raw', 'Error while creating a request!');
    throw newError.JSON;
  }
};
