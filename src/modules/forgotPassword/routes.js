import controllers from './controller';
import validators from './validator';

const routes = {
  add: {
    path: '/add/{email}',
    method: 'GET',
  },
  resetPassword: {
    path: '/resetPassword',
    method: 'PATCH',
  },
};

const ForgotPasswordRoutes = {
  name: 'forgotPasswords',
  routes,
  controllers,
  validators,
};

export default ForgotPasswordRoutes;
