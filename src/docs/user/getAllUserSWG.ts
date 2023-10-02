import { TAG } from '../mainInfo/tags';

const GET = {
  get: {
    security: [{ bearerAuth: [] }],
    summary: 'View all user by admin',
    tags: [TAG.USER.tags.name],
    description: 'View info about all user',
    operationId: 'viewAllUser',

    responses: {
      200: {
        description: '------LIST OF USER--------',
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
    },
  },
};
export default GET;
