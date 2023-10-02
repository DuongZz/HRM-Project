/* eslint-disable prettier/prettier */
import { AbsentRequest } from '@/typeorm/entities/users/AbsentRequest';
import { query } from 'express';
import { Repository, getRepository } from 'typeorm';

const requestViewWithIdFilter = async (queryId) => {
  const repo = getRepository(AbsentRequest);
  let queryBuilder: any = {};

  // if (queryId) {
  //   // queryBuilder = { ...queryBuilder, where: {} };
  //   queryBuilder.where = { ...queryBuilder.where, user: {} };
  //   queryBuilder.where.user = { ...queryBuilder.where.user, id: queryId };
  //   queryBuilder
  // }
  // queryBuilder = userId, name, tuoi{ }
  queryBuilder = {
    ...(queryId
      ? {
          where: {
            user: {
              id: queryId,
            },
          },
        }
      : {}),
  };

  const absentRequestLists = await repo.find({ ...queryBuilder });
  return absentRequestLists;
};

export { requestViewWithIdFilter };
// where: {
//   user: {
//     id: 18,
//         },
// },
