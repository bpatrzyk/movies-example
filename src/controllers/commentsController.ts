import { Request, Response } from 'express';
import * as service from '../services/commentsService';
import { NewComment } from '../models/commentModel';

export async function getComments(req: Request, res: Response) {
  const comments = await service.getComments();
  res.send(comments);
}

export async function postComment(req: Request, res: Response) {
  const comment = await service.createComment(req.body as NewComment);
  res.send(comment);
}
