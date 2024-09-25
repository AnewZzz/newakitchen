

const Boom = require('@hapi/boom');
const NotificationModel = require('./model');
const mongoose = require('mongoose');
const {broadcastNotification} = require('../../config/websocket');
const { getById } = require('../image/controller');

const NotificationController = {
  async create(req) {
    if (!req.currentUser) {
      throw Boom.unauthorized();
    }
    // const currUser = req?.currentUser;
    if (!currUser?.id) {
      throw Boom.unauthorized();
    }
    const { payload } = req;

    payload.initiator = currUser._id;
    console.log(currUser)
    
    // Create the notification
    const notification = await NotificationModel.create(payload)
      .then(doc => NotificationModel.populate(doc, { path: 'initiator' }));

    if (notification) {
      // Broadcast the notification to connected WebSocket clients
      broadcastNotification(notification);
    }
    return "Notification created successfully";
  },
  async getById(req) {
    const { id } = req.params;
    return NotificationModel.findOne({ _id: id });
  },

  async list() {
    return NotificationModel.find()
  },
};

module.exports = {
  NotificationController,
  create: req => NotificationController.create(req),
  list: req => NotificationController.list(req),
  getById: req => NotificationController.getById(req)
}