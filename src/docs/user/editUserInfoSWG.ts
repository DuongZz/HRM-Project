import { TAG } from '../mainInfo/tags';

const PATCH = {
  patch: {
    security: [{ bearerAuth: [] }],
    summary:
      `Edit by either normal user or manager, normal user like HR and EMPLOYEE can only edit their account infomation, while Manager can take` +
      `action on every account as well as they have their id.`,
    tags: [TAG.USERS.tags.name],
    description: 'Edit by either normal user or manager',
    operationId: 'editUserInfo',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          type: 'string',
          description: 'the tracking information for Userid, that you modify (if you are manager)',
          default: 'd8cadae8-ee4c-4170-b4af-aceb3770f97c',
          example: 'd8cadae8-ee4c-4170-b4af-aceb3770f97c',
        },
        required: false,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/EditUserInfo',
          },
        },
      },
    },
    responses: {
      200: {
        description: '**MODIFY REQUEST SUCCESFULLY**',
      },

      400: {
        description: '**UNAUTHORIZED**',
      },
      401: {
        description: '**JWT Token Error**',
      },
      403: {
        description: '**Authentications Failed**',
      },
      404: {
        description: 'User not found',
      },
      409: {
        description: 'Cannot take action with database',
      },
    },
  },
};

export default PATCH;
