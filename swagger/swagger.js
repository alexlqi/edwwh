// swagger/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

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
                url: 'http://localhost:3000', // Cambia esto según tu configuración
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
    apis: ['./server.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
