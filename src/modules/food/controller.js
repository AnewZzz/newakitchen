const mongoose = require('mongoose');

const model = require('./model');
const { DataUtils } = require('../../utils/data');
const { controller: ImageController } = require('../image/controller');

const { ObjectId } = mongoose.Types;

const controller = {
  async create(req) {
    try {
      const { payload } = req;
      const food = await model.create(payload);
      return food;
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
    if (!payload?.preferredKitchen) {
      delete payload.preferredKitchen;
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
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'kitchen',
          localField: 'preferredKitchen',
          foreignField: '_id',
          as: 'preferredKitchen',
        },
      },
      {
        $unwind: {
          path: '$preferredKitchen',
          preserveNullAndEmptyArrays: true,
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
    if (filter?.name) {
      query.push({
        $match: {
          normalizedName: {
            $regex: new RegExp(filter.name.toLowerCase(), 'gi'),
          },
        },
      });
    }
    if (filter?.category) {
      query.push({
        $match: {
          'category.name': {
            $regex: new RegExp(filter.category, 'gi'),
          },
        },
      });
    }

    const list = await DataUtils.paging({
      start,
      limit,
      sort: { normalizedName: 1 },
      model,
      query,
    });
    return list;
  },
  async getAll() {
    const query = [
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $unwind: {
          path: '$category',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'kitchen',
          localField: 'preferredKitchen',
          foreignField: '_id',
          as: 'preferredKitchen',
        },
      },
      {
        $unwind: {
          path: '$preferredKitchen',
          preserveNullAndEmptyArrays: true,
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
      {
        $sort: {
          name: 1,
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
    query.category = query?.category || '';
    const start = query && query.start ? query.start : 0;
    const limit = query && query.limit ? query.limit : 10;
    return controller.list(query, { start, limit });
  },
  getAll: () => controller.getAll(),
};
