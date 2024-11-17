// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

/**
 * @swagger
 * tags:
 *   name: Webhooks
 *   description: Operaciones relacionadas con la recepción de webhooks
 */

/**
 * @swagger
 * /webhook/{nombre_clave_webhook}:
 *   post:
 *     summary: Recibir un webhook
 *     tags: [Webhooks]
 *     parameters:
 *       - in: path
 *         name: nombre_clave_webhook
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre clave del webhook
 *       - in: query
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: Usuario para autenticación
 *       - in: query
 *         name: pass
 *         required: true
 *         schema:
 *           type: string
 *         description: Contraseña para autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Payload del webhook
 *     responses:
 *       200:
 *         description: Webhook recibido y almacenado
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error al almacenar el webhook
 */
router.post('/:nombre_clave_webhook', webhookController.authenticate, webhookController.receiveWebhook);

module.exports = router;
