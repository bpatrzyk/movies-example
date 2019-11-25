import { commentsRouter } from './commentsRouter';
import { asyncErrorHandler } from '../utils/errors/asyncErrorHandler';
import { getComments, postComment } from '../controllers/commentsController';
import { postCommentValidator } from '../validators/commentsValidator';

jest.mock('../utils/errors/asyncErrorHandler', () => ({
  asyncErrorHandler: jest.fn().mockImplementation(arg => arg),
}));
jest.mock('../controllers/commentsController', () => ({
  getComments: jest.fn(),
  postComment: jest.fn(),
}));
jest.mock('../validators/commentsValidator', () => ({
  postCommentValidator: jest.fn(),
}));

describe('commentsRouter', () => {
  it('should register GET comments route', () => {
    expect(commentsRouter.get).toHaveBeenCalledWith('/', asyncErrorHandler(getComments));
  });

  it('should register POST comment route', () => {
    expect(commentsRouter.post).toHaveBeenCalledWith(
      '/',
      postCommentValidator,
      asyncErrorHandler(postComment),
    );
  });
});
