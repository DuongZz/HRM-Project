import { TAG } from '../mainInfo/tags';

const POST = {
  post: {
    security: [{ bearerAuth: [] }],
    summary: 'Borrow a device',
    tags: [TAG.DEVICE.tags.name],
    description: 'Borrow a device',
    operationId: 'viewBorrowDevice',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          type: 'string',
          description: 'The tracking information for id',
          default: '',
        },
        description: 'Fields that filtered the request only by DeviceId',
        required: true,
      },
    ],
    responses: {
      200: {
        description: 'Borrow device successfully',
      },

      404: {
        description: 'Device id does not exist',
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
export default POST;
