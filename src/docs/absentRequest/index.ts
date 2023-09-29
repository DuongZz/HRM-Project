import viewAbsentRequestsBySwagger from './viewAbsentRequestsSWG';
import viewAbsentRequestBySwagger from './viewAbsentRequestSWG';
import requestAbsentBySwagger from './requestAbsentSWG';

export const PathObject = {
  paths: {
    '/absent-request/view': {
      ...viewAbsentRequestsBySwagger,
    },
    '/absent-request/view/{id}': {
      ...viewAbsentRequestBySwagger,
    },
    '/absent-request': {
      ...requestAbsentBySwagger,
    },
  },
};
