import { TAG } from '../mainInfo/tags';

const GET = {
  get: {
    security: [{ bearerAuth: [] }],
    summary: 'View absent request by Admin, user cannot view this.',
    tags: [TAG.ABSENT_REQUEST.tags.name],
    description: 'View absent-request from Employee and HR can provide information about Employee working status',
    operationId: 'viewAllRequest',
    parameters: [
      {
        name: 'main_point',
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
