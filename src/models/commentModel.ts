import { db } from './db';

export interface Comment extends CommentData {
  id: string;
}

export interface CommentData {
  movie_id: string;
  username: string;
  comment: string;
}

export async function getComments() {
  return db<Comment>('comments').select();
}

export async function createComment(comment: CommentData) {
  const [createdComment] = await db<Comment>('comments')
    .insert(comment)
    .returning('*');
  return createdComment;
}
