// routes/credentialRoutes.js
const express = require('express');
const router = express.Router();
const credentialController = require('../controllers/credentialController');

/**
 * @swagger
 * tags:
 *   name: Credenciales
 *   description: Operaciones relacionadas con credenciales de webhooks
 */

/**
 * @swagger
 * /api/webhook/{nombre_clave_webhook}/crear-credenciales:
 *   post:
 *     summary: Crear credenciales para un webhook específico
 *     tags: [Credenciales]
 *     parameters:
 *       - in: path
 *         name: nombre_clave_webhook
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre clave del webhook
 *     responses:
 *       201:
 *         description: Credenciales creadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: string
 *                 password:
 *                   type: string
 *       500:
 *         description: Error al crear credenciales
 */
router.post('/:nombre_clave_webhook/crear-credenciales', credentialController.createCredentials);

/**
 * @swagger
 * /api/webhook/{nombre_clave_webhook}/usuarios:
 *   get:
 *     summary: Obtener lista de usuarios para un webhook específico
 *     tags: [Credenciales]
 *     parameters:
 *       - in: path
 *         name: nombre_clave_webhook
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre clave del webhook
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nombre_clave_webhook:
 *                     type: string
 *                   user:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error al obtener usuarios
 */
router.get('/:nombre_clave_webhook/usuarios', credentialController.listUsers);

module.exports = router;
