import Hapi from '@hapi/hapi';
import DotEnv from 'dotenv';
import Path from 'path';

import Inert from 'inert';
import ACL_PLUGIN from './plugins/ACL';
import RoutePlugin from './plugins/Route';
import cronjob from './config/cron';
import ConnectDb from './config/connectDb';
import { initWebSocketServer } from './config/websocket';

const Good = require('@hapi/good');

DotEnv.config();

ConnectDb();
cronjob();
const rootPath = Path.resolve('./');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3001,
    routes: {
      files: {
        relativeTo: Path.join(rootPath, 'public'),
      },
    },
  });

  await server.register([
    {
      plugin: Good,
      options: {
        reporters: {
          console: [
            {
              module: '@hapi/good-console',
            },
            'stdout',
          ],
        },
      },
    },
    Inert,
    ACL_PLUGIN,
    RoutePlugin,
  ]);
  initWebSocketServer();
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
