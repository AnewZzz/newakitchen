const KitchenModel = require('./model');
const { DataUtils } = require('../../utils/data');

const KitchenController = {
  async create(req) {
    return KitchenModel.create(req.payload);
  },
  async delete(req) {
    const { id } = req.params;
    return KitchenModel.findByIdAndRemove(id);
  },

  async update(req) {
    const { params, payload } = req;
    return KitchenModel.findByIdAndUpdate(params.id, payload, { new: 1 });
  },
  async getById(req) {
    const { id } = req.params;
    return KitchenModel.findOne({ _id: id });
  },
  async list(filter, { start, limit }) {
    const query = [
      {
        $addFields: {
          normalizedName: { $toLower: '$name' },
        },
      },
    ];

    if (filter?.name) {
      const regex = new RegExp(filter.name, 'gi');

      query.push({
        $match: {
          name: { $regex: regex },
        },
      });
    }
    if (filter?.isPrimary) {
      query.push({
        $match: {
          isPrimary: true,
        },
      });
    }

    return DataUtils.paging({
      start,
      limit,
      sort: { normalizedName: 1 },
      model: KitchenModel,
      query,
    });
  },
};

module.exports = {
  KitchenController,
  create: req => KitchenController.create(req),
  delete: req => KitchenController.delete(req),
  update: req => KitchenController.update(req),
  getById: req => KitchenController.getById(req),
  list: req => {
    const { query = {} } = req;
    query.name = query && query.name ? query.name : '';
    const start = query && query.start ? query.start : 0;
    const limit = query && query.limit ? query.limit : 10;
    return KitchenController.list(query, { start, limit });
  },
};
