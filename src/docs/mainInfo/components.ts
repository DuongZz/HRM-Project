export const COMPONENTS = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      RequestAbsent: {
        type: 'object',
        properties: {
          main_point: {
            type: 'string',
            description: 'Main Reason About Absent Request',
            example: 'Go to USA, California with mom',
          },
          reason: {
            type: 'string',
            description: 'Details Reason about Absent Request',
            example: `the reason that i'm absent today is related to drinking with mom latenight in California`,
          },
          date_of_absence_begin: {
            type: 'string',
            description: 'The beginning date of absent period',
            example: '2024/11/18 13:00',
          },
          date_of_absence_end: {
            type: `string`,
            description: `The end date of absent period`,
            example: `2024/11/19 12:00`,
          },
        },
      },
      ErrorCode400: {
        type: 'object',
        properties: {
          httpStatusCode: {
            type: 'number',
            description: 'HTTP Status Code',
            example: 400,
          },
          typeError: {
            type: 'string',
            description: 'Type Of Error',
            example: 'Raw',
          },
          message: {
            type: `string`,
            description: `Bad Request`,
            example: `You can't view`,
          },
        },
      },
      ErrorCode401: {
        type: 'object',
        properties: {
          httpStatusCode: {
            type: 'number',
            description: 'HTTP Status Code',
            example: 401,
          },
          typeError: {
            type: 'string',
            description: 'Type Of Error',
            example: 'Raw',
          },
          message: {
            type: `string`,
            description: `JWT error`,
            example: `You can't view the list of requests without authorization`,
          },
        },
      },
      viewAbsentRequests: {
        type: 'object',
        properties: {
          id: {
            type: 'string', // data-type
            description: 'identification number for absentRequest', // desc
            example: 'dc59a07c-e57a-46cf-b7be-37f3977efba2', // example of an id
          },
          user_id: {
            type: 'string', // data-type
            example: '9bbf6f96-98c2-4312-a641-963e88c2dc1b', // desc
            description: `The User ID, that make the request, 
            if it's null, the request is not handled`, // example of a title
          },
          main_point: {
            type: 'string', // data type
            description: 'the summary of the absent request', // desc
            example: `visiting my friends in America 3`, // example of a completed value
          },
          reason: {
            type: 'string', // data type
            description: `the details of the absent request`, // desc
            example: `the reason that i'm absent today is related to drinking with father latenight`, // example of a completed value
          },
          requested_date: {
            type: 'string', // data type
            description: 'the datetime that request is created', // desc
            example: `2023-09-26 15:10:22.778`, // example of a completed value
          },
          date_of_absence_begin: {
            type: 'string', // data type
            description: 'the datetime when the absent is in effect', // desc
            example: `2024-11-18 12:00:00`, // example of a completed value
          },
          date_of_absence_end: {
            type: 'string', // data type
            description: 'the datetime when the absent is activated expired', // desc
            example: `2024-11-19 12:00:00`, // example of a completed value
          },
          is_accepted: {
            type: `string`,
            description: `the status of the absent request: PENDING | APPROVED | REJECTED`,
            example: `PENDING`,
          },
          approved_date: {
            type: `string`,
            description: `the datetime when the absent request is handled`,
            example: `null`,
          },
          approved_by: {
            type: `string`,
            description: `The manager name that either handled the request or not, if not, this fields is null`,
            example: `null`,
          },
        },
      },

      viewAbsentRequest: {
        type: 'object',
        properties: {
          id: {
            type: 'string', // data-type
            description: 'identification number for absentRequest', // desc
            example: 'dc59a07c-e57a-46cf-b7be-37f3977efba2', // example of an id
          },
          user_id: {
            type: 'string', // data-type
            example: '9bbf6f96-98c2-4312-a641-963e88c2dc1b', // desc
            description: `The User ID, that make the request, 
            if it's null, the request is not handled`, // example of a title
          },
          main_point: {
            type: 'string', // data type
            description: 'the summary of the absent request', // desc
            example: `visiting my friends in America 3`, // example of a completed value
          },
          reason: {
            type: 'string', // data type
            description: `the details of the absent request`, // desc
            example: `the reason that i'm absent today is related to drinking with father latenight`, // example of a completed value
          },
          requested_date: {
            type: 'string', // data type
            description: 'the datetime that request is created', // desc
            example: `2023-09-26 15:10:22.778`, // example of a completed value
          },
          date_of_absence_begin: {
            type: 'string', // data type
            description: 'the datetime when the absent is in effect', // desc
            example: `2024-11-18 12:00:00`, // example of a completed value
          },
          date_of_absence_end: {
            type: 'string', // data type
            description: 'the datetime when the absent is activated expired', // desc
            example: `2024-11-19 12:00:00`, // example of a completed value
          },
          is_accepted: {
            type: `string`,
            description: `the status of the absent request: PENDING | APPROVED | REJECTED`,
            example: `PENDING`,
          },
          approved_date: {
            type: `string`,
            description: `the datetime when the absent request is handled`,
            example: `null`,
          },
          approved_by: {
            type: `string`,
            description: `The manager name that either handled the request or not, if not, this fields is null`,
            example: `null`,
          },
        },
      },
    },
  },
};
