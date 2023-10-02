import viewAbsentRequestBySwagger from './viewAbsentRequestSWG';
import requestAbsentBySwagger from './requestAbsentSWG';
import handleAbsentRequestBySwagger from './handleAbsentRequestSWG';
import viewAbsentRequestsBySwagger from './viewAbsentRequestsSWG';
export const PathAbsentRequest = {
  '/absent-request/view/{id}': {
    ...viewAbsentRequestBySwagger,
  },
  '/absent-request': {
    ...requestAbsentBySwagger,
  },
  '/absent-request/request-handler/{id}': {
    ...handleAbsentRequestBySwagger,
  },
  '/absent-request/view': {
    ...viewAbsentRequestsBySwagger,
  },
};
export default PathAbsentRequest;
