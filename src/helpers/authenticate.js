const Boom = require('@hapi/boom');
const Role = require('../modules/role/services');

module.exports = {
  authenticate: context => {
    if (!context.currentUser) throw Boom.unauthorized();

    return context.currentUser;
  },

  checkPermissions: async (context, requiredPermissions) => {
    let isAllowed = true;
    if (!requiredPermissions || !requiredPermissions.length) return true;
    if (!context?.currentUser) return false;
    const { role } = context.currentUser;
    if (!role || !role.length) return false;
    const rolePermissions = await Role.calculatePermissions(role);
    isAllowed = rolePermissions.some(
      permission => requiredPermissions.indexOf(permission) !== -1
    );

    return isAllowed;
  },
};
