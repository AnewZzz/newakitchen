const pkg = require('../../package.json');
const Auth = require('../utils/authentication');

const handleAccessControl = async (request, h) => {
  const { headers } = request;
  let currentUser = null;
  if (headers?.authorization) {
    const decoded = await Auth.decodeToken(headers?.authorization);
    currentUser = decoded;
  }
  request.currentUser = currentUser;
  return h.continue;
};

const ACL_PLUGIN = {
  name: 'acl-plugin',
  version: pkg.version,
  register: server => {
    server.ext('onRequest', handleAccessControl);
  },
};

module.exports = ACL_PLUGIN;
