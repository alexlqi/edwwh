// server.js
const express = require('express');
const connectDB = require('./db');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swagger');
const basicAuth = require('express-basic-auth');

// Rutas
const credentialRoutes = require('./routes/credentialRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Configuración de Swagger con Autenticación Básica
const swaggerAuth = basicAuth({
    users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASS },
    challenge: true,
    unauthorizedResponse: (req) => 'No autorizado',
});

// Ruta para servir la documentación de Swagger con autenticación básica
app.use('/api-docs', swaggerAuth, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Usar las rutas definidas
app.use('/api/webhook', credentialRoutes);
app.use('/webhook', webhookRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Documentación de Swagger disponible en http://localhost:${PORT}/api-docs`);
});
