// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre_clave_webhook: { type: String, required: true },
    user: { type: String, required: true },
    pass: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
