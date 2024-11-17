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
        // Generar usuario único
        const user = uuidv4();

        // Generar contraseña segura
        const plainPassword = uuidv4();
        const hashedPassword = await bcrypt.hash(plainPassword, 10);

        // Guardar en la colección de usuarios
        const newUser = new User({
            nombre_clave_webhook,
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
