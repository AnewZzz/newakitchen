import controllers from './controller';
import * as PERMISSIONS from '../../constants/permissions';
import validators from './validator';

const routes = {
  create: {
    path: '',
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
    permissions: [PERMISSIONS.ADMIN.WRITE, PERMISSIONS.COUNTER.WRITE],
  },
  list: {
    path: '',
    method: 'GET',
    // permissions: [PERMISSIONS.ADMIN.WRITE],
  },
  getAll: {
    path: '/listAll',
    method: 'GET',
  },
};

const Routes = {
  name: 'customer',
  routes,
  controllers,
  validators,
};

export default Routes;
