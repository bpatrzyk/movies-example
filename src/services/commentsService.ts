import * as model from '../models/commentModel';

export async function getComments() {
  return await model.getComments();
}

export async function createComment(comment: model.CommentData) {
  return await model.createComment(comment);
}
