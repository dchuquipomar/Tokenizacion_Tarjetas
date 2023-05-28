import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    { 
      http: {
        method: 'post',
        path: 'v2/tokens',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
