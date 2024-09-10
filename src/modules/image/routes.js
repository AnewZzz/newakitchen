import controllers from './controller';
// import * as PERMISSIONS from '../../constants/permissions';
// import validators from './validator';

const routes = {
  create: {
    path: '/upload',
    method: 'POST',
    permissions: [],
    config: {
      payload: {
        output: 'stream',
        parse: true,
        multipart: true,
        allow: 'multipart/form-data',
        maxBytes: 3 * 1000 * 1000,
      },
    },
  },
};

const Routes = {
  name: 'image',
  routes,
  controllers,
};

export default Routes;
