// models/Webhook.js
const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema({}, { strict: false, timestamps: true });

module.exports = (collectionName) => mongoose.model(collectionName, webhookSchema, collectionName);
