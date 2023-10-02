import { TAG } from '../mainInfo/tags';

const POST = {
  post: {
    security: [{ bearerAuth: [] }],
    summary: 'Send absent request by user who is not an admin, admin cannot take action on this.',
    tags: [TAG.ABSENT_REQUEST.tags.name],
    description: 'Send absent-request by **Employee and HR** can provide information about Employee working status',
    operationId: 'sendRequest',
    parameters: [],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/RequestAbsent',
          },
        },
      },
    },
    responses: {
      200: {
        description: '**GET USER SUCCESFULLY**',
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
    },
  },
};

export default POST;
