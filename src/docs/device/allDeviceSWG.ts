import { TAG } from '../mainInfo/tags';

const GET = {
  get: {
    security: [{ bearerAuth: [] }],
    summary: 'View all device by admin',
    tags: [TAG.DEVICE.tags.name],
    description: 'View info about all device',
    operationId: 'viewAllDevice',

    responses: {
      200: {
        description: '------LIST OF DEVICE--------',
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
