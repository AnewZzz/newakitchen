import controllers from './controller';
import * as PERMISSIONS from '../../constants/permissions';
import validators from './validator';

const routes = {
  create: {
    path: '',
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
    permissions: [],
  },
  list: {
    path: '',
    method: 'GET',
    permissions: [],
  },
};

const KitchenRoutes = {
  name: 'kitchen',
  routes,
  controllers,
  validators,
};

export default KitchenRoutes;