const Boom = require('@hapi/boom');

const model = require('./model');
// const { DataUtils } = require('../../utils/data');
const { handleFileUpload } = require('../../helpers/fileUpload');
const { handleFileDelete } = require('../../helpers/fileDelete');

const controller = {
  async create(req) {
    try {
      const { payload } = req;
      const { file } = payload;
      const fileName = await handleFileUpload(file);
      if (!fileName) return Boom.badRequest('Couldnot upload image');
      return model.create({ name: fileName });
    } catch (err) {
      console.log({ err });
      throw new Error(err);
    }
  },
  async getById(req) {
    const { id } = req.params;

    const imageDoc = await model.findById(id);
    return imageDoc;
  },
  async removeImage(id) {
    const image = await model.findById(id);
    if (!image?.name) return Boom.notFound('Image not found');
    return handleFileDelete(image?.name);
  },
};

module.exports = {
  controller,
  create: req => controller.create(req),
  getById: (req, h) => controller.getById(req, h),
  removeImage: req => controller.removeImage(req.params.id),
};
