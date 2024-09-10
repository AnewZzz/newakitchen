const model = require('./model');
const { DataUtils } = require('../../utils/data');

const controller = {
  async create(req) {
    return model.create(req.payload);
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
  async list(filter, { start, limit }) {
    const query = [];

    Object.keys(filter).forEach(key => {
      const filedName = key;

      const value = filter[key];

      if (!value) return;

      if (filedName === 'name') {
        const regex = new RegExp(value, 'gi');

        query.push({
          $match: {
            name: { $regex: regex },
          },
        });
      }

      return query.push({
        $match: {
          [filedName]: value,
        },
      });
    });

    return DataUtils.paging({
      start,
      limit,
      sort: { created_at: -1 },
      model,
      query,
    });
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
};
