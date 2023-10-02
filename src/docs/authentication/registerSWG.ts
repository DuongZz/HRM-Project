import { TAG } from '../mainInfo/tags';

const POST = {
  post: {
    security: [{ bearerAuth: [] }],

    summary: `View register only by HR`,
    tags: [TAG.AUTH.tags.name],
    description: 'Register new employee',
    operationId: 'viewRegister',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/register',
          },
        },
        'application/xml': {
          schema: {
            $ref: '#/components/schemas/register',
          },
        },
        'application/x-www-form-url-urlencoded': {
          schema: {
            $ref: '#/components/schemas/register',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Register successfully',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/register',
            },
          },
        },
      },
      400: {
        description: '**BAD REQUEST**',
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
};

export default POST;
