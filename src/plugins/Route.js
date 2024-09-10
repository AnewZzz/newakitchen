import Boom from '@hapi/boom';

import Package from '../../package.json';
import Authenticate from '../helpers/authenticate';
import APP_ROUTES from '../modules/routes';

const RoutePlugin = {
  name: 'route-plugin',
  version: Package.version,
  register: async server => {
    const BASE_URL = '/api/v1';

    function registerRoutes({ name, routes, validators = {}, controllers }) {
      const operations = Object.keys(routes);
      operations.forEach(operation => {
        const route = routes[operation];
        const handler = controllers[operation];
        const validate = validators[operation] || {};
        const { path, method, permissions = [], config = {} } = route;
        const routPath = `${BASE_URL}/${name + path}`;

        server.route({
          path: routPath,
          method,
          handler: async (req, h) => {
            const perms = permissions;
            const isAllowed = await Authenticate.checkPermissions(req, perms);
            if (!isAllowed)
              return Boom.unauthorized(
                'You are not authorized to access this route'
              );
            return handler(req, h);
          },

          options: {
            validate: {
              ...validate,
              failAction: (request, h, err) => {
                return Boom.badRequest(err);
              },
            },
            ...config,
          },
        });
      });
    }

    function serveImage() {
      server.route({
        method: 'GET',
        path: `${BASE_URL}/imagedelivery/{file*}`,
        handler: {
          directory: {
            path: 'uploads',
          },
        },
      });
    }
    function registerModules() {
      APP_ROUTES.forEach(async mdl => registerRoutes(mdl));
    }
    registerModules();
    serveImage();
  },
};

export default RoutePlugin;
