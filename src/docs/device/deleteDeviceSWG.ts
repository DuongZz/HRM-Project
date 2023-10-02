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
          default: '4c0f38d9-19da-4dff-8359-485b2dd96257',
          example: '4c0f38d9-19da-4dff-8359-485b2dd96257',
        },
        description: 'Fields that filtered the request only by UserID',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Delete device successfully',
      },
      400: {
        description: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorCode400',
              },
            },
          },
        },
      },
    },
  },
};
export default DELETE;
