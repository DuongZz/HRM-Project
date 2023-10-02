import { TAG } from '../mainInfo/tags';

const GET = {
  get: {
    security: [{ bearerAuth: [] }],
    summary: 'View absent request by Admin, user cannot view this.',
    tags: [TAG.ABSENT_REQUEST.tags.name],
    description: 'View absent-request from Employee and HR can provide information about Employee working status',
    operationId: 'viewAllRequest',
    parameters: [],

    responses: {
      200: {
        description: '**GET USER SUCCESFULLY**',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/viewAbsentRequests',
            },
          },
        },
      },

      400: {
        description: '**UNAUTHORIZED**',
        content: {
          'application/json': {
            schema: {
              $ref: `#/components/schemas/ErrorCode400`,
            },
          },
        },
      },
      401: {
        description: '**JWT Token Error**',
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
