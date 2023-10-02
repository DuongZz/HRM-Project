import { TAG } from '../mainInfo/tags';
const DELETE = {
  delete: {
    security: [{ bearerAuth: [] }],
    summary: 'Delete a user',
    tags: [TAG.USER.tags.name],
    description: 'Delete a user',
    operationId: 'viewDeleteUser',
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
    responses: {
      200: {
        description: 'Delete user successfully',
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

export default DELETE;
