import { TAG } from '../mainInfo/tags';

const DELETE = {
  delete: {
    security: [{ bearerAuth: [] }],

    summary: `Delete a device`,
    tags: [TAG.DEVICE.tags.name],
    description: 'Delete a device',
    operationId: 'viewDeleteDevice',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          type: 'string',
          description: 'The tracking information for id',
          default: '',
        },
        description: 'Fields that filtered the request only by DeviceID',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Delete device successfully',
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
    },
  },
};
export default DELETE;
