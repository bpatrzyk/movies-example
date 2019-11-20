import { Request, Response } from 'express';
import * as service from '../services/commentsService';
import * as mapper from '../mappers/commentsMapper';
import { NewCommentDTO } from '../dtos/commentDTOs';

export async function getComments(req: Request, res: Response) {
  const comments = await service.getComments();
  res.send(mapper.toCommentsDTO(comments));
}

export async function postComment(req: Request, res: Response) {
  const newCommentDTO = req.body as NewCommentDTO;
  const comment = await service.createComment(mapper.toCommentData(newCommentDTO));
  res.send(mapper.toCommentDTO(comment));
}
