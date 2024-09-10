// const Boom = require('@hapi/boom');

// function authorizeUser(decodedToken, requiredPermissions) {
//   const {
//     data: { permissions },
//   } = decodedToken;
//   if (!permissions) throw ERROR.UNAUTHORIZED;
//   if (!permissions.some(perms => requiredPermissions.includes(perms))) {
//     throw ERROR.UNAUTHORIZED;
//   }
//   return decodedToken;
// }

// module.exports = {
//   authorizeUser,
// };
