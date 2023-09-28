import { TAG } from '../mainInfo/tags';

const GET = {
  get: {
    summary: 'View absent request by Admin, user cannot view this.',
    tags: [TAG.ABSENT_REQUEST.tags.name],
    description: 'View absent-request from Employee and HR can provide information about Employee working status',
    operationId: 'viewAllRequest',
    parameter: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/viewAbsentRequest',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'GET USER SUCCESFULLY',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/viewAbsentRequest',
            },
          },
        },
      },
      400: {
        description: 'Bad Request',
      },
    },
  },
};

export default GET;