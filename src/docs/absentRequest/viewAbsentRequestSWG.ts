import { TAG } from '../mainInfo/tags';

const GET = {
  get: {
    security: [{ bearerAuth: [] }],
    summary:
      `View absent request by Admin based on User that made request, user cannot view this. The request also need` +
      ` user ID`,
    tags: [TAG.ABSENT_REQUEST.tags.name],
    description: 'View absent-request from Employee and HR can provide information about Employee working status',
    operationId: 'viewRequestByUserID',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          type: 'string',
          description: 'the tracking information for id',
          default: '9bbf6f96-98c2-4312-a641-963e88c2dc1b',
          example: '9bbf6f96-98c2-4312-a641-963e88c2dc1b',
        },
        description: 'Fields that filtered the request only by UserID',
        required: true,
      },
    ],

    responses: {
      200: {
        description: '**GET USER SUCCESSFULLY**',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/viewAbsentRequest',
            },
          },
        },
      },
      401: {
        description: '**UNAUTHORIZED**',
        content: {
          'application/json': {
            schema: {
              $ref: `#/components/schemas/ErrorCode401`,
            },
          },
        },
      },
    },
  },
};

export default GET;
