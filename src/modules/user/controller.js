const mongoose = require('mongoose');
const Boom = require('@hapi/boom');

const Secure = require('../../utils/hash');
const UserModel = require('./model');
const { DataUtils } = require('../../utils/data');
const Auth = require('../../utils/authentication');
const { encryptPassword } = require('../../helpers/encryptPassword');

const { ObjectId } = mongoose.Types;

const UserController = {
  async add(req) {
    const { payload } = req;
    const { email, contact } = payload;
    let { password } = payload;

    // Use contact as password if password is not provided
    if (!password) {
      password = contact;
    }

    try {
      // Check if user already exists by email or contact
      const userExists = await UserController.checkUserPresent({
        email,
        contact,
      });
      if (userExists && userExists.email === email) {
        const err = Boom.badRequest('This email is already taken');
        err.output.statusCode = 401;
        err.reformat();
        throw err;
      }
      if (userExists && userExists.contact === contact) {
        const err = Boom.badRequest('User with this contact is already taken');
        err.output.statusCode = 401;
        err.reformat();
        throw err;
      }

      // Encrypt password
      const encryptedPassword = encryptPassword(password);
      const hash = await Secure.generateHash(password);
      payload.password = hash;
      payload.user_password = encryptedPassword;

      // Create new user
      const user = await UserModel.create(payload);
      return user;
    } catch (err) {
      // Catch validation or other errors
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
          .map(error => error.message)
          .join(', ');
        const validationError = Boom.badRequest(message);
        validationError.output.statusCode = 400;
        validationError.output.payload.details = err.errors;
        validationError.reformat();
        throw validationError;
      }

      // Re-throw any other errors
      throw err;
    }
  },

  async checkUserPresent(fields = {}) {
    const query = [];
    const orExpression = [];
    try {
      Object.keys(fields).forEach(key => {
        if (!fields[key]) return;
        if (key === '_id') {
          return orExpression.push({
            _id: ObjectId(fields[key]),
          });
        }
        if (key === 'username') {
          return orExpression.push(
            { email: fields[key] },
            { contact: fields[key] }
          );
        }

        return orExpression.push({
          [key]: fields[key],
        });
      });

      query.push([
        {
          $match: {
            $or: orExpression,
          },
        },
        {
          $lookup: {
            from: 'kitchen',
            localField: 'designated_kitchen',
            foreignField: '_id',
            as: 'designated_kitchen',
          },
        },
        {
          $unwind: {
            path: '$designated_kitchen',
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);
      const user = await UserModel.aggregate(query);
      return user[0];
    } catch (error) {
      throw Boom.badRequest('Database connection error');
    }
  },
  async deleteUser(req) {
    const { id } = req.params;
    return UserModel.findByIdAndUpdate(id, { isArchived: true }, { new: 1 });
  },
  async updateUser(req) {
    const { id } = req.params;
    const { payload } = req;
    return UserModel.findByIdAndUpdate(id, payload, { new: 1 });
  },
  async updateMe(req) {
    const { currentUser, payload } = req;
    return UserModel.findByIdAndUpdate(currentUser.id, payload, { new: 1 });
  },
  async getUserById(req) {
    const { id } = req.params;
    return UserModel.findOne({ _id: id });
  },
  async list(filter, { start, limit }) {
    const query = [
      {
        $addFields: {
          normalizedName: { $toLower: '$name' },
        },
      },
    ];

    if (!filter?.isArchived) {
      query.push({
        $match: {
          isArchived: false,
        },
      });
    }
    if (filter?.name) {
      const regex = new RegExp(filter.name, 'gi');

      query.push({
        $match: {
          name: { $regex: regex },
        },
      });
    }

    return DataUtils.paging({
      start,
      limit,
      sort: { normalizedName: 1 },
      model: UserModel,
      query,
    });
  },
  async login(req) {
    const { username, password, deviceToken } = req.payload;
    if (!deviceToken) {
      throw Boom.badRequest('Device Token not provided.');
    }
    const userPresent = await UserController.checkUserPresent({ username });
    const currUser = await UserModel.findOne({ username });
    if (!userPresent) {
      throw Boom.notFound('User not registered ');
    }

    if (userPresent?.isArchived || !userPresent?.isActive) {
      throw Boom.forbidden(
        'This account has been deactivated. Please request admin to change'
      );
    }

    if (userPresent?.deviceToken && userPresent?.deviceToken !== deviceToken) {
      throw Boom.forbidden(
        'User is still logged in on another mobile. Please logout from that device to login from another device.'
      );
    }

    const passwordMatched = await Secure.compare(
      password,
      userPresent.password
    );

    if (!passwordMatched) throw Boom.unauthorized('Password is incorrect');
    const tokenData = {
      id: userPresent._id,
      role: userPresent.role,
    };
    currUser.deviceToken = deviceToken;
    await currUser.save();

    delete userPresent.password;
    return { user: userPresent, token: Auth.generateToken(tokenData) };
  },

  async changePassword(req) {
    const { currentUser, payload } = req;
    const { previousPassword, newPassword } = payload;

    const userPresent = await UserController.checkUserPresent({
      _id: currentUser?.id,
    });
    if (!userPresent) {
      throw Boom.notFound('User not registered ');
    }

    if (userPresent?.isArchived || !userPresent?.isActive) {
      throw Boom.forbidden(
        'This account has been deactivated. Please request admin to change'
      );
    }
    const passwordMatched = await Secure.compare(
      previousPassword,
      userPresent.password
    );

    if (!passwordMatched) throw Boom.unauthorized('Password is incorrect');
    const hash = await Secure.generateHash(newPassword);
    const password = hash;

    return UserModel.findByIdAndUpdate(
      currentUser?.id,
      { password },
      { new: 1 }
    );
  },

  async logout(req) {
    const { id } = req.payload;
    console.log(id);
    try {
      // Find the user by their ID
      const currUser = await UserModel.findOne({ _id: id });

      // Check if user exists
      if (!currUser) {
        throw Boom.notFound('User not found.');
      }

      // Clear the device token
      currUser.deviceToken = null;

      // Save the updated user document
      await currUser.save();

      return { message: 'Successfully logged out.' };
    } catch (error) {
      console.error('Logout error:', error);
      throw Boom.badRequest('Logout error.');
    }
  },
};

module.exports = {
  UserController,
  add: req => UserController.add(req),
  deleteUser: req => UserController.deleteUser(req),
  list: req => {
    const { query = {} } = req;
    query.name = query && query.name ? query.name : '';
    query.email = query && query.email ? query.email : '';
    query.contact = query && query.contact ? query.contact : '';
    const start = query && query.start ? query.start : 0;
    const limit = query && query.limit ? query.limit : 10;
    return UserController.list(query, { start, limit });
  },
  getUserById: req => UserController.getUserById(req),
  updateUser: req => UserController.updateUser(req),
  login: req => UserController.login(req),
  updateMe: req => UserController.updateMe(req),
  changePassword: req => UserController.changePassword(req),
  logout: req => UserController.logout(req),
};
