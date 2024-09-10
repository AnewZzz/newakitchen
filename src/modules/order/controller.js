const Boom = require('@hapi/boom');

const model = require('./model');
const { DataUtils } = require('../../utils/data');

const controller = {
  async create(req) {
    if (!req.currentUser) {
      throw Boom.unauthorized();
    }
    const currUser = req?.currentUser;

    if (!currUser?.id) {
      throw Boom.unauthorized();
    }
    const { payload } = req;

    payload.initiator = currUser.id;
    return model
      .create(req.payload)
      .then(doc => model.populate(doc, { path: 'initiator' }));
  },
  async delete(req) {
    const { id } = req.params;
    return model.findByIdAndUpdate(id, { isArchived: true }, { new: 1 });
  },

  async update(req) {
    const { params, payload } = req;
    return model.findByIdAndUpdate(params.id, payload, { new: 1 });
  },
  async getById(req) {
    const { id } = req.params;
    return model.findOne({ _id: id });
  },
  async lastOrderNumber() {
    return model
      .findOne({
        $match: {
          created_at: {
            $gte: new Date(new Date().toDateString()),
            $lt: new Date(new Date().toDateString()),
          },
        },
      })
      .sort({ created_at: -1 })
      .select('_id, orderNumber');
  },
  async list(filter, { start, limit }) {
    const query = [
      {
        $lookup: {
          from: 'users',
          localField: 'initiator',
          foreignField: '_id',
          as: 'initiator',
        },
      },

      {
        $unwind: {
          path: '$initiator',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unset: 'initiator.password',
      },
    ];
    if (filter?.name) {
      const regex = new RegExp(filter.name, 'gi');

      query.push(
        {
          $addFields: {
            orderName: {
              $toString: { $toLower: '$recipient' },
            },
          },
        },
        {
          $match: {
            orderName: { $regex: regex },
          },
        }
      );
    }

    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
      model,
      query,
    });
  },
  async listAll(filter) {
    const query = [
      {
        $lookup: {
          from: 'users',
          localField: 'initiator',
          foreignField: '_id',
          as: 'initiator',
        },
      },

      {
        $unwind: {
          path: '$initiator',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unset: 'initiator.password',
      },
      {
        $sort: { created_at: -1 },
      },
    ];
    if (filter?.name) {
      const regex = new RegExp(filter.name, 'gi');

      query.push(
        {
          $addFields: {
            orderName: {
              $toString: { $toLower: '$recipient' },
            },
          },
        },
        {
          $match: {
            orderName: { $regex: regex },
          },
        }
      );
    }
    return model.aggregate(query);
  },
};

module.exports = {
  controller,
  create: req => controller.create(req),
  delete: req => controller.delete(req),
  update: req => controller.update(req),
  getById: req => controller.getById(req),
  list: req => {
    const { query = {} } = req;
    query.name = query && query.name ? query.name : '';
    const start = query && query.start ? query.start : 0;
    const limit = query && query.limit ? query.limit : 10;
    return controller.list(query, { start, limit });
  },
  lastOrderNumber: req => controller.lastOrderNumber(req),
  listAll: req => {
    const { query = {} } = req;
    query.name = query && query.name ? query.name : '';
    return controller.listAll(query);
  },
};
