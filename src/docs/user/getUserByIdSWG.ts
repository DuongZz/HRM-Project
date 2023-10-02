import { TAG } from '../mainInfo/tags';

const GET = {
  get: {
    security: [{ bearerAuth: [] }],
    summary: 'Get user info by manager',
    tags: [TAG.USER.tags.name],
    description: 'Get a user',
    operationId: 'viewUserInfo',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          type: 'string',
          description: 'The tracking information for id',
          default: '',
        },
        description: 'Fields that filtered the request only by UserId',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Get a user successfully',
      },
      401: {
        description: '**UNAUTHORIZED**',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorCode401',
            },
          },
        },
      },
      404: {
        description: 'User id does not exist ',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorCode404',
            },
          },
        },
      },
    },
  },
};
export default GET;
