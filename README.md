# Webhook App

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-green.svg)
![Express](https://img.shields.io/badge/express-%5E4.17.1-yellow.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.0.0-brightgreen.svg)

## Table of Contents

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
  - [Generar Credenciales](#generar-credenciales)
  - [Enviar un Webhook](#enviar-un-webhook)
  - [Listar Usuarios](#listar-usuarios)
- [Documentación de la API](#documentación-de-la-api)
- [Seguridad](#seguridad)
- [Consideraciones Adicionales](#consideraciones-adicionales)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Descripción

**Webhook App** es una aplicación backend construida con Node.js y Express que permite la creación y gestión de webhooks reutilizables. Proporciona endpoints dinámicos para distintos webhooks, maneja la autenticación mediante credenciales específicas y almacena los datos recibidos en MongoDB. Además, integra Swagger para la documentación interactiva de la API, protegida con autenticación básica.

## Características

- **Endpoints Dinámicos:** Crea y maneja múltiples webhooks a través de rutas dinámicas.
- **Autenticación Segura:** Utiliza `user` y `pass` en la URL para autenticar solicitudes de webhook.
- **Almacenamiento en MongoDB:** Guarda los datos de los webhooks en colecciones específicas según el `nombre_clave_webhook`.
- **Generación de Credenciales:** Genera usuarios y contraseñas únicos para cada webhook.
- **Documentación con Swagger:** Documenta y prueba la API de manera interactiva, protegida con autenticación básica.
- **Estructura Modular:** Código organizado con controladores y rutas para facilitar el mantenimiento y escalabilidad.

## Tecnologías

- **Node.js:** Entorno de ejecución para JavaScript.
- **Express:** Framework web para Node.js.
- **MongoDB:** Base de datos NoSQL para almacenar webhooks y usuarios.
- **Mongoose:** ODM para MongoDB.
- **Swagger:** Herramienta para documentar APIs.
- **bcryptjs:** Librería para encriptar contraseñas.
- **uuid:** Generación de identificadores únicos.
- **dotenv:** Manejo de variables de entorno.

## Estructura del Proyecto

```
webhook-app/
├── controllers/
│   ├── credentialController.js
│   └── webhookController.js
├── models/
│   ├── User.js
│   └── Webhook.js
├── routes/
│   ├── credentialRoutes.js
│   └── webhookRoutes.js
├── swagger/
│   └── swagger.js
├── middleware/
│   └── errorHandler.js
├── db.js
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Instalación

### Prerrequisitos

- **Node.js** (v14 o superior)
- **npm** (v6 o superior)
- **MongoDB** (local o remoto)

### Pasos

1. **Clonar el Repositorio**

   ```bash
   git clone https://github.com/tu-usuario/webhook-app.git
   cd webhook-app
   ```

2. **Instalar Dependencias**

   ```bash
   npm install
   ```

## Configuración

1. **Crear Archivo `.env`**

   En la raíz del proyecto, crea un archivo llamado `.env` y agrega las siguientes variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/edwwh
   SWAGGER_USER=admin
   SWAGGER_PASS=secretpassword
   ```

   - **PORT:** Puerto en el que correrá la aplicación.
   - **MONGODB_URI:** URI de conexión a tu base de datos MongoDB.
   - **SWAGGER_USER:** Usuario para acceder a la documentación de Swagger.
   - **SWAGGER_PASS:** Contraseña para acceder a la documentación de Swagger.

2. **Asegurar el Archivo `.env`**

   Asegúrate de que el archivo `.env` esté incluido en tu `.gitignore` para evitar exponer información sensible.

   ```gitignore
   # .gitignore
   node_modules/
   .env
   ```

## Uso

### Iniciar el Servidor

```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`.

### Generar Credenciales

Genera un usuario y contraseña únicos para un webhook específico.

- **Endpoint:** `POST /api/webhook/{nombre_clave_webhook}/crear-credenciales`
- **Parámetros:**
  - `nombre_clave_webhook` (ruta): Nombre clave del webhook.

**Ejemplo de Solicitud:**

```bash
POST http://localhost:3000/api/webhook/orders/crear-credenciales
```

**Respuesta:**

```json
{
    "message": "Credenciales creadas exitosamente",
    "user": "uuid-generado",
    "password": "contraseña-generada"
}
```

> **Nota:** Guarda la contraseña en un lugar seguro ya que solo se muestra una vez.

### Enviar un Webhook

Envía una solicitud POST al webhook con autenticación.

- **Endpoint:** `POST /webhook/{nombre_clave_webhook}`
- **Parámetros de Consulta:**
  - `user`: Usuario generado.
  - `pass`: Contraseña generada.
- **Cuerpo:** Payload del webhook en formato JSON.

**Ejemplo de Solicitud:**

```bash
POST http://localhost:3000/webhook/orders?user=uuid-generado&pass=contraseña-generada
Content-Type: application/json

{
    "orderId": 12345,
    "status": "completed",
    "amount": 250.00
}
```

**Respuesta:**

```json
{
    "message": "Webhook recibido y almacenado"
}
```

### Listar Usuarios

Obtén la lista de usuarios asociados a un `nombre_clave_webhook` específico.

- **Endpoint:** `GET /api/webhook/{nombre_clave_webhook}/usuarios`
- **Parámetros:**
  - `nombre_clave_webhook` (ruta): Nombre clave del webhook.

**Ejemplo de Solicitud:**

```bash
GET http://localhost:3000/api/webhook/orders/usuarios
```

**Respuesta:**

```json
[
    {
        "_id": "60f5a3c2b6e4f72d88f1a2b3",
        "nombre_clave_webhook": "orders",
        "user": "uuid-generado",
        "createdAt": "2024-04-27T12:34:56.789Z"
    },
    ...
]
```

## Documentación de la API

La documentación interactiva de la API está disponible a través de **Swagger UI**, protegida con autenticación básica.

- **URL:** `http://localhost:3000/api-docs`
- **Credenciales:**
  - **Usuario:** Definido en `SWAGGER_USER` (por defecto: `admin`)
  - **Contraseña:** Definida en `SWAGGER_PASS` (por defecto: `secretpassword`)

### Acceder a Swagger UI

1. Abre tu navegador y navega a `http://localhost:3000/api-docs`.
2. Ingresa las credenciales de Swagger.
3. Explora y prueba los diferentes endpoints de la API.

## Seguridad

- **Autenticación de Webhooks:** Cada webhook requiere `user` y `pass` en la URL para autenticar las solicitudes.
- **Encriptación de Contraseñas:** Las contraseñas se almacenan en la base de datos encriptadas utilizando `bcryptjs`.
- **Protección de Documentación:** Swagger UI está protegido con autenticación básica para evitar el acceso no autorizado.
- **Variables de Entorno:** Información sensible como credenciales y URI de MongoDB se almacenan en el archivo `.env`.

> **Recomendaciones Adicionales:**
>
> - **Usar HTTPS:** Asegura la transmisión de datos cifrando el tráfico entre el cliente y el servidor.
> - **Rate Limiting:** Implementa limitación de tasa para prevenir abusos en los endpoints.
> - **Validación de Entradas:** Asegura que los datos recibidos cumplen con los formatos esperados.

## Consideraciones Adicionales

- **Manejo de Errores:** La aplicación incluye manejo básico de errores. Considera implementar un middleware global para una gestión más robusta.
- **Validación de Datos:** Se recomienda utilizar librerías como **Joi** o **express-validator** para validar los datos entrantes.
- **Pruebas:** Implementa pruebas unitarias y de integración para asegurar la funcionalidad de cada componente.
- **Escalabilidad:** La estructura modular permite escalar fácilmente añadiendo nuevos controladores y rutas según sea necesario.

## Contribución

¡Contribuciones son bienvenidas! Sigue estos pasos para contribuir:

1. **Fork el Repositorio**
2. **Crea una Rama para tu Feature**

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. **Realiza tus Cambios y Commit**

   ```bash
   git commit -m "Añadir nueva funcionalidad"
   ```

4. **Empuja tu Rama**

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. **Crea un Pull Request**

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
```