import controllers from './controller';
import * as PERMISSIONS from '../../constants/permissions';
import validators from './validator';

const routes = {
  add: {
    path: '/add/{email}',
    method: 'GET',
    permissions: [PERMISSIONS.ADMIN.WRITE],
  },
  matchPin: {
    path: '/matchPin',
    method: 'POST',
    permissions: [PERMISSIONS.ADMIN.WRITE],
  },
};

const ForgotPasswordRoutes = {
  name: 'forgotPasswords',
  routes,
  controllers,
  validators,
};

export default ForgotPasswordRoutes;
