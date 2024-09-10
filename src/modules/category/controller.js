const model = require('./model');
const { DataUtils } = require('../../utils/data');

const controller = {
  async create(req) {
    return model.create(req.payload);
  },
  async delete(req) {
    const { id } = req.params;
    return model.findOneAndDelete({ _id: id });
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
    const query = [
      {
        $addFields: {
          normalizedName: { $toLower: '$name' },
        },
      },
    ];

    // Object.keys(filter).forEach(key => {
    //   const filedName = key;

    //   const value = filter[key];

    //   if (!value) return;

    //   if (filedName === 'name') {
    //     const regex = new RegExp(value, 'gi');

    //     return query.push({
    //       $match: {
    //         name: regex,
    //       },
    //     });
    //   }

    //   return query.push({
    //     $match: {
    //       [filedName]: value,
    //     },
    //   });
    // });
    if (filter?.name) {
      query.push({
        $match: {
          name: { $regex: new RegExp(filter.name, 'gi') },
        },
      });
    }

    return DataUtils.paging({
      start,
      limit,
      sort: { normalizedName: 1 },
      model,
      query,
    });
  },
  async getAll() {
    const query = [
      {
        $addFields: {
          normalizedName: {
            $toLower: '$name',
          },
        },
      },
      {
        $sort: {
          normalizedName: 1,
        },
      },
    ];
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
  getAll: () => controller.getAll(),
};
