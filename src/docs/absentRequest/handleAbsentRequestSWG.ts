import { TAG } from '../mainInfo/tags';

const PATCH = {
  patch: {
    security: [{ bearerAuth: [] }],
    summary: 'Handle absent request by MANAGER, normal user like HR and EMPLOYEE cannot take action on this.',
    tags: [TAG.ABSENT_REQUEST.tags.name],
    description: 'Handle absent-request by **Employee and HR** can provide information about Employee working status',
    operationId: 'handleRequest',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          type: 'string',
          description: 'the tracking information for id',
          default: 'f5a7124c-e476-4f62-8b6b-ef8299517ad5',
          example: 'f5a7124c-e476-4f62-8b6b-ef8299517ad5',
        },
        description: 'Fields that filtered the request only by RequestID',
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/HandleAbsentRequest',
          },
        },
      },
    },
    responses: {
      200: {
        description: '**MODIFY REQUEST SUCCESFULLY**',
        // content: {
        //   'application/json': {
        //     schema: {
        //       $ref: '#/components/schemas/RequestAbsent',
        //     },
        //   },
        // },
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
      403: {
        description: '**JWT Token Error**',
      },
    },
  },
};

export default PATCH;
