import { TAG } from '../mainInfo/tags';

const PATCH = {
  patch: {
    security: [{ bearerAuth: [] }],
    summary: 'Edit user profile',
    tags: [TAG.USER.tags.name],
    description: 'Edit user profile',
    operationId: 'viewEditUser',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          type: 'string',
          description: 'The tracking information for id',
          default: '',
        },
        description: 'Fields that filtered the request only by UserID',
        required: true,
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/user',
          },
        },
        'application/xml': {
          schema: {
            $ref: '#/components/schemas/user',
          },
        },
        'application/x-www-form-url-urlencoded': {
          schema: {
            $ref: '#/components/schemas/user',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Edit Successfully',
      },

      400: {
        description: '**BAD REQUEST**',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorCode400',
            },
          },
        },
      },
      404: {
        description: 'User id does not exist',
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
export default PATCH;
