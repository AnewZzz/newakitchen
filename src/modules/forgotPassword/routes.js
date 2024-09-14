import controllers from './controller';
import validators from './validator';

const routes = {
  add: {
    path: '/add/{email}',
    method: 'GET',
  },
  matchPin: {
    path: '/matchPin',
    method: 'POST',
  },
};

const ForgotPasswordRoutes = {
  name: 'forgotPasswords',
  routes,
  controllers,
  validators,
};

export default ForgotPasswordRoutes;
