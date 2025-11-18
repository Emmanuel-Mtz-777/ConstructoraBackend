// swagger.js
import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 3000;
const HOST = process.env.HOST ?? 'localhost';

const doc = {
  info: {
    title: 'Constructora Backend API',
    description: 'Documentación generada automáticamente con swagger-autogen',
  },

  host: `${HOST}:${PORT}`,
  schemes: ['http'],

  tags: [
    { name: "Users", description: "Operaciones relacionadas con usuarios" },
    { name: "Vehicles", description: "Gestión de vehículos" },
    { name: "Projects", description: "Administración de proyectos" },
    { name: "Access", description: "Control de accesos" }
  ],

  definitions: {
    UserRegister: {
      email: "usuario@example.com",
      password: "123456",
      name: "Juan Pérez",
      rol: "visitante"
    },

    UserLogin: {
      email: "usuario@example.com",
      password: "123456"
    },

    Vehicle: {
      placa: "ABC-123",
      tipo: "Camioneta",
      asignadoAProyecto: "64affc21b219ad2f4ce8e123",
      estado: "Activo"
    },

    Project: {
      name: "Proyecto Ejemplo",
      location: "Ciudad de México",
      state: "En progreso",
      startDate: "2025-01-01T00:00:00.000Z",
      client: "Cliente XYZ"
    },

    Access: {
      user: "64affc21b219ad2f4ce8e123",
      resource: "proyecto",
      resourceId: "64affc21b219ad2f4ce8e456",
      action: "leer",
      timestamp: "2025-01-01T00:00:00.000Z"
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen()(outputFile, routes, doc);
