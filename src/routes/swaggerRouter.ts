import { Router } from 'express';
import swaggerUiExpress from 'swagger-ui-express';
import { specs } from '../utils/swagger/swaggerUi';

export const swaggerRouter: Router = Router();

swaggerRouter.use('/docs', swaggerUiExpress.serve);
swaggerRouter.get('/docs', swaggerUiExpress.setup(specs, { isExplorer: true }));
