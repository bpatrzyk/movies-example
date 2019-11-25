import { db } from './db';

export interface Comment extends CommentData {
  id: string;
}

export interface CommentData {
  movie_id: string;
  username: string;
  comment: string;
}

export interface CommentFilters {
  movieId?: string;
}

export async function getComments(filters?: Partial<Record<keyof CommentFilters, string>>) {
  const query = db<Comment>('comments');

  if (filters && filters.movieId) {
    query.where({ movie_id: filters.movieId });
  }

  return query.select();
}

export async function createComment(comment: CommentData) {
  const [createdComment] = await db<Comment>('comments')
    .insert(comment)
    .returning('*');
  return createdComment;
}
