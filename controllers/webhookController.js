// controllers/webhookController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const createWebhookModel = require('../models/Webhook');

/**
 * Middleware para autenticar solicitudes de webhook.
 */
const authenticate = async (req, res, next) => {
    const { nombre_clave_webhook } = req.params;
    const { user, pass } = req.query;

    if (!user || !pass) {
        return res.status(401).json({ message: 'Credenciales faltantes' });
    }

    try {
        const usuario = await User.findOne({ nombre_clave_webhook, user });

        if (!usuario) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(pass, usuario.pass);

        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Autenticación exitosa
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error de autenticación' });
    }
};

/**
 * Recibir y almacenar un webhook.
 */
const receiveWebhook = async (req, res) => {
    const { nombre_clave_webhook } = req.params;
    const payload = req.body;

    try {
        // Obtener o crear el modelo para la colección específica
        const WebhookModel = createWebhookModel(nombre_clave_webhook);

        // Guardar el payload
        const webhookEntry = new WebhookModel(payload);
        await webhookEntry.save();

        res.status(200).json({ message: 'Webhook recibido y almacenado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al almacenar el webhook' });
    }
};

module.exports = {
    authenticate,
    receiveWebhook
};
