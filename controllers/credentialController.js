// controllers/credentialController.js
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

/**
 * Crear credenciales para un webhook específico.
 */
const createCredentials = async (req, res) => {
    const { nombre_clave_webhook } = req.params;

    try {
        // Generar usuario único de 8 caracteres facil de leer solo alfanumérico
        const user = uuidv4().slice(-8).replace(/-/g, '');

        // generar un verify token usando nombre_clave_webhook como semilla
        const verifyToken = bcrypt.hashSync(nombre_clave_webhook, 10);

        // genera una contraseña segura facil de leer
        const plainPassword = Math.random().toString(36).slice(-10);

        // hashear contraseña segura
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Guardar en la colección de usuarios
        const newUser = new User({
            nombre_clave_webhook,
            verifyToken,
            user,
            pass: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: 'Credenciales creadas exitosamente',
            user,
            password: plainPassword // Asegúrate de mostrar la contraseña solo una vez
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear credenciales' });
    }
};

/**
 * Obtener lista de usuarios para un webhook específico.
 */
const listUsers = async (req, res) => {
    const { nombre_clave_webhook } = req.params;

    try {
        const usuarios = await User.find({ nombre_clave_webhook }).select('-pass'); // Excluir contraseñas
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

module.exports = {
    createCredentials,
    listUsers
};
