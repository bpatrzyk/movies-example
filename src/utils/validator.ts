// see https://stackoverflow.com/questions/28769200/unit-testing-validation-with-express-validator
import { Request, Response, NextFunction } from 'express';
import { ValidationChain } from 'express-validator';

export async function testExpressValidatorMiddleware(req: Request, res: Response, middlewares: (ValidationChain | ((req: Request, res: Response, next: NextFunction) => void))[]) {
  await Promise.all(middlewares.map(async (middleware) => {
    await middleware(req, res, () => undefined);
  }));
}
