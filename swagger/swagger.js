// swagger/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Webhooks Reutilizables',
            version: '1.0.0',
            description: 'API para gestionar webhooks reutilizables con autenticación y documentación Swagger.',
        },
        servers: [
            {
                url: `http://localhost:${port}`, // Cambia esto según tu configuración
            },
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: 'http',
                    scheme: 'basic',
                },
            },
        },
        security: [
            {
                basicAuth: [],
            },
        ],
    },
    // Ruta a los archivos donde se encuentran las anotaciones
    apis: ['./routes/*.js'], // Asegúrate de que las rutas sean correctas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
