import { db } from './db';

export interface Comment {
  id: string;
  movie_id: string;
  comment: string;
}

export interface NewComment {
  movie_id: string;
  comment: string;
}

export async function getComments() {
  return db<Comment>('comments')
    .select();
}

export async function createComment(comment: NewComment) {
  const [createdComment] = await db<Comment>('comments')
    .insert(comment)
    .returning('*');
  return createdComment;
}
