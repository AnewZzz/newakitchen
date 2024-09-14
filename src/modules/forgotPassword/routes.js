import controllers from './controller';
import validators from './validator';

const routes = {
  add: {
    path: '',
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
