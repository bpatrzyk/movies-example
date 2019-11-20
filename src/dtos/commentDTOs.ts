export interface NewCommentDTO {
  movieId: string;
  username: string;
  comment: string;
}

export interface CommentDTO {
  id: string;
  movieId: string;
  username: string;
  comment: string;
}
