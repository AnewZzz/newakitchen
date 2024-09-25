import controllers from './controller';
import validators from './validator';

const routes = {
  create: {
    path: '/create',
    method: 'POST',
  },

  list: {
    path: '',
    method: 'GET',
  },

  getById: {
    path: '/{id}',
    method: 'GET'
  }
};

const NotificationRoutes = {
  name: 'notifications',
  routes,
  controllers,
  validators,
};

export default NotificationRoutes;
