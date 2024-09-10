const Role = require('./model');

module.exports = {
  async calculatePermissions(name) {
    if (!name) return [];
    let roles = name;
    if (typeof name === 'string') roles = name.split(',');
    const validRoles = await Role.find({
      name: { $in: roles },
      $or: [{ expiry_date: null }, { expiry_date: { $gt: new Date() } }],
    });

    let perms = [];
    validRoles.forEach(r => {
      perms = [...new Set([...perms, ...r.permissions])];
    });
    return perms;
  },
};
