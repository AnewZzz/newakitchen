const mongoose = require('mongoose');
const model = require('./model');
const { DataUtils } = require('../../utils/data');
const { controller: ImageController } = require('../image/controller');
const { ObjectId } = mongoose.Types;


const controller = {
  async create(req) {
    try {
      const { payload } = req;
      const customer = await model.create(payload);
      return customer;
    } catch (err) {
      throw new Error(err);
    }

  },

  async delete(req) {
    const { id } = req.params;
    const prevDoc = await model.findById(id);

    if (prevDoc?.photo) {
      await ImageController.removeImage(prevDoc.photo);
    }
    return model.findOneAndDelete({ _id: id });
  },

  async update(req) {
    const { params, payload } = req;
    const prevDoc = await model.findById(params.id);

    if (payload?.photo && prevDoc?.photo) {
      await ImageController.removeImage(prevDoc.photo);
    }
    return model.findByIdAndUpdate(params.id, payload, { new: 1 });
  },

  async getById(req) {
    const { id } = req.params;
    const query = [
      {
        $match: {
          _id: ObjectId(id),
        },
      },
      {
        $lookup: {
          from: 'image',
          localField: 'photo',
          foreignField: '_id',
          as: 'photo',
        },
      },
      {
        $unwind: {
          path: '$photo',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          photo: '$photo.name',
        },
      },
    ];
    const doc = await model.aggregate(query);
    return doc?.[0];
  },

  async list(filter, { start, limit }) {
    const query = [
      {
        $addFields: {
          normalizedName: { $toLower: '$name' },
        },
        $addFields: {
          photo: '$photo.name',
        },
      },
    ];

    const { name } = filter;
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
    if (name) {
      const regex = new RegExp(name, 'gi');

      query.push({
        $match: {
          name: { $regex: regex },
        },
      });
    }

    return DataUtils.paging({
      start,
      limit,
      sort: { pinned: -1, normalizedName: 1 },
      model,
      query,
    });
  },
  async getAll() {
    const query = [
      {
        $addFields: {
          normalizedName: { pinned: -1, $toLower: '$name' },
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
    const start = query && query.start ? query.start : 0;
    const limit = query && query.limit ? query.limit : 10;
    return controller.list(query, { start, limit });
  },
  getAll: () => controller.getAll(),
};
