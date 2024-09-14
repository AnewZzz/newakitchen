import controllers from './controller';
import * as PERMISSIONS from '../../constants/permissions';
import validators from './validator';

const routes = {
  add: {
    path: '/create',
    method: 'POST',
    permissions: [PERMISSIONS.ADMIN.WRITE],
  },
  list: {
    path: '/list',
    method: 'GET',
  },
  deleteUser: {
    path: '/delete/{id}',
    method: 'PATCH',
    permissions: [PERMISSIONS.ADMIN.WRITE],
  },
  getUserById: {
    path: '/{id}',
    method: 'GET',
  },
  updateUser: {
    path: '/update/{id}',
    method: 'PATCH',
    permissions: [PERMISSIONS.ADMIN.WRITE],
  },
  login: {
    path: '/login',
    method: 'POST',
  },

  logout: {
    path: '/logout',
    method: 'POST',
  },

  updateMe: {
    path: '/editProfile',
    method: 'PATCH',
    permissions: [
      PERMISSIONS.ADMIN.WRITE,
      PERMISSIONS.COOK.WRITE,
      PERMISSIONS.RECPTIONIST.WRITE,
    ],
  },
  changePassword: {
    path: '/changePassword',
    method: 'PATCH',
    permissions: [
      PERMISSIONS.ADMIN.WRITE,
      PERMISSIONS.COOK.WRITE,
      PERMISSIONS.RECPTIONIST.WRITE,
    ],
  },
  resetPassword: {
    path: '/resetPassword',
    method: 'PATCH',
    permissions: [
      PERMISSIONS.ADMIN.WRITE,
    ]
  }
};

const UserRoutes = {
  name: 'users',
  routes,
  controllers,
  validators,
};

export default UserRoutes;
