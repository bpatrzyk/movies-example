import { CommentDTO, NewCommentDTO } from '../dtos/commentDTOs';
import { Comment, CommentData } from '../models/commentModel';

export function toCommentData(newCommentDTO: NewCommentDTO) {
  return {
    movie_id: newCommentDTO.movieId,
    username: newCommentDTO.username,
    comment: newCommentDTO.comment,
  } as CommentData;
}

export function toCommentDTO(comment: Comment) {
  return {
    id: comment.id,
    movieId: comment.movie_id,
    username: comment.username,
    comment: comment.comment,
  } as CommentDTO;
}
