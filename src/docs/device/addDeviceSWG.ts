import { TAG } from '../mainInfo/tags';

const POST = {
  post: {
    summary: `Add new device by manager`,
    tags: [TAG.DEVICE.tags.name],
    description: 'Add new device',
    operationId: 'viewDeviceManager',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/device',
          },
        },
        'application/xml': {
          schema: {
            $ref: '#/components/schemas/device',
          },
        },
        'application/x-www-form-url-urlencoded': {
          schema: {
            $ref: '#/components/schemas/device',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Add device successfully',
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
export default POST;
