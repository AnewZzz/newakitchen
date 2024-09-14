import controllers from './controller';
import * as PERMISSIONS from '../../constants/permissions';
import validators from './validator';

const routes = {
  create: {
    path: '/add',
    method: 'POST',
    permissions: [PERMISSIONS.ADMIN.WRITE, PERMISSIONS.COUNTER.WRITE],
  },
  delete: {
    path: '/delete/{id}',
    method: 'DELETE',
    permissions: [PERMISSIONS.ADMIN.WRITE],
  },
  update: {
    path: '/update/{id}',
    method: 'PATCH',
    permissions: [PERMISSIONS.ADMIN.WRITE, PERMISSIONS.COUNTER.WRITE],
  },
  getById: {
    path: '/{id}',
    method: 'GET',
  },
  list: {
    path: '/list',
    method: 'GET',
  },
  getAll: {
    path: '/listAll',
    method: 'GET',
  },
};

const Routes = {
  name: 'food',
  routes,
  controllers,
  validators,
};

export default Routes;
