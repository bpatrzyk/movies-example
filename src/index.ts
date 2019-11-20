import { config as dotenv } from 'dotenv';

dotenv();

import express from 'express';
import { apiV1 } from './routes/apiV1';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './utils/logger';
import { errorLogMiddleware, logMiddleware } from './middlewares/logger';

const port = process.env.PORT;

const app = express();
app.use(logMiddleware);

app.use('/api/v1', apiV1);

app.use(errorLogMiddleware);
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server started at http://localhost:${port}`);
});
