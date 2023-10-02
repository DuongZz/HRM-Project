import { AbsentRequest } from '@/typeorm/entities/users/AbsentRequest';
import { CustomError } from '@/utils/response/custom-error/CustomError';
import { Repository } from 'typeorm';

export const saveRequestContent = async (
  absentRequestRepository: Repository<AbsentRequest>,
  requestAbsent: AbsentRequest,
) => {
  try {
    await absentRequestRepository.save(requestAbsent);
  } catch (err) {
    const customError = new CustomError(
      409,
      'Raw',
      `Request by '${requestAbsent.user.id}' can't be created.`,
      null,
      err,
    );
    return customError;
  }
  return true;
};
