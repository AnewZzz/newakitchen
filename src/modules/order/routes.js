import controllers from './controller';
import * as PERMISSIONS from '../../constants/permissions';
import validators from './validator';

const routes = {
  create: {
    path: '',
    method: 'POST',
    permissions: [
      PERMISSIONS.ADMIN.WRITE,
      PERMISSIONS.RECPTIONIST.WRITE,
      PERMISSIONS.COOK.WRITE,
      PERMISSIONS.COUNTER.WRITE,
    ],
  },
  delete: {
    path: '/delete/{id}',
    method: 'PATCH',
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
      PERMISSIONS.RECPTIONIST.WRITE,
      PERMISSIONS.COOK.WRITE,
      PERMISSIONS.COUNTER.WRITE,
    ],
  },
  list: {
    path: '',
    method: 'GET',
    permissions: [
      PERMISSIONS.ADMIN.WRITE,
      PERMISSIONS.RECPTIONIST.WRITE,
      PERMISSIONS.COOK.WRITE,
      PERMISSIONS.COUNTER.WRITE,
    ],
  },
  lastOrderNumber: {
    path: '/last-order-number',
    method: 'GET',
    permissions: [PERMISSIONS.ADMIN.READ, PERMISSIONS.RECPTIONIST.READ,PERMISSIONS.COUNTER.READ],
  },
  listAll: {
    path: '/listAll',
    method: 'GET',
  },
};

const Routes = {
  name: 'order',
  routes,
  controllers,
  validators,
};

export default Routes;
