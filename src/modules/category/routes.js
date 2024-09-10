import controllers from './controller';
import * as PERMISSIONS from '../../constants/permissions';
import validators from './validator';

const routes = {
  create: {
    path: '/add',
    method: 'POST',
    permissions: [PERMISSIONS.ADMIN.WRITE],
  },
  delete: {
    path: '/delete/{id}',
    method: 'DELETE',
    permissions: [PERMISSIONS.ADMIN.WRITE],
  },
  update: {
    path: '/update/{id}',
    method: 'PATCH',
    permissions: [PERMISSIONS.ADMIN.WRITE],
  },
  getById: {
    path: '/{id}',
    method: 'GET',
    permissions: [
      PERMISSIONS.ADMIN.WRITE,
      PERMISSIONS.COOK.WRITE,
      PERMISSIONS.RECPTIONIST.WRITE,
    ],
  },
  list: {
    path: '/list',
    method: 'GET',
    permissions: [
      PERMISSIONS.ADMIN.WRITE,
      PERMISSIONS.COOK.WRITE,
      PERMISSIONS.RECPTIONIST.WRITE,
    ],
  },
  getAll: {
    path: '/listAll',
    method: 'GET',
  },
};

const Routes = {
  name: 'category',
  routes,
  controllers,
  validators,
};

export default Routes;
