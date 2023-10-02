import { TAG } from '../mainInfo/tags';

const POST = {
  post: {
    summary: `Account administrator authentication, unauthorized users`,
    tags: [TAG.AUTHENTICATION.tags.name],
    description: 'Administrator authentication',
    operationId: 'viewAdmin',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/authentication',
          },
        },
        'application/xml': {
          schema: {
            $ref: '#/components/schemas/authentication',
          },
        },
        'application/x-www-form-url-urlencoded': {
          schema: {
            $ref: '#/components/schemas/authentication',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Login successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/authentication',
            },
          },
        },
      },
      400: {
        description: {
          content: {
            'application/json': {
              schema: {
                $ref: `#/components/schemas/ErrorCode400`,
              },
            },
          },
        },
      },
    },
  },
};

export default POST;
