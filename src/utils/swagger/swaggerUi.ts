import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Movies Example',
      version: '0.0.1',
      description: 'A demo node.js project - movie database with external API integration.',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
    },
    servers: [
      {
        url: '/api/v1',
      },
    ],
  },
  apis: ['**/*.ts'] as any[],
};

export const specs = swaggerJsdoc(options);
