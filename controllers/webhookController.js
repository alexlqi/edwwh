// controllers/webhookController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const createWebhookModel = require('../models/Webhook');

/**
 * Middleware para autenticar solicitudes de webhook.
 */
const authenticate = async (req, res, next) => {
    const { nombre_clave_webhook } = req.params;
    const { credentials } = req.query;
    let user, pass;

    if (credentials) {
        [user, pass] = Buffer.from(credentials, 'base64').toString('utf-8').split(':');
    }else{
        user = req.query.user;
        pass = req.query.pass;
    }
    
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
        const webhookEntry = new WebhookModel({payload: payload});
        await webhookEntry.save();

        res.status(200).json({ message: 'Webhook recibido y almacenado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al almacenar el webhook' });
    }
};

const enrolarMetaWebhook = async (req, res) => {
    const { nombre_clave_webhook } = req.params;
    const { user } = req.query;

    try {
        // buscar el verify token del usuario del nombre_clave_webhook en users  
        const usuario = await User.findOne({ nombre_clave_webhook, user });

        if (!usuario) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        if (
            req.query['hub.mode'] == 'subscribe' &&
            req.query['hub.verify_token'] == usuario.verifyToken
        ) {
            res.send(req.query['hub.challenge']);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error de Enrollado' });
    }
};

module.exports = {
    authenticate,
    receiveWebhook,
    enrolarMetaWebhook
};
