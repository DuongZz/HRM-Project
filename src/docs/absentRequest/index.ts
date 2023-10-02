import viewAbsentRequestsBySwagger from './viewAbsentRequestsSWG';
import viewAbsentRequestBySwagger from './viewAbsentRequestSWG';
import requestAbsentBySwagger from './requestAbsentSWG';

const PathAbsentRequest = {
  '/absent-request/view': {
    ...viewAbsentRequestsBySwagger,
  },
  '/absent-request/view/{id}': {
    ...viewAbsentRequestBySwagger,
  },
  '/absent-request': {
    ...requestAbsentBySwagger,
  },
  '/request-handler/{id}': {},
};
export default PathAbsentRequest;
