import { executeQuery } from "../config/db";
import { IUser, IComment } from "../types/types";
import userService from "./userService";

class CommentService {
  public getAllComments = async () => {
    try {
      const result = (await executeQuery('SELECT * FROM comments'))[0];
      return result;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public createComment = async (content: string, userId: number, postId: number) => {
    try {
      const user = await userService.findUser(userId);
      if (user) {
        const result = (await executeQuery('INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3) RETURNING *', [content, (user as IUser).id, postId]))[0];
        return result;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  }

  public getCommentById = async (commentId: number) => {
    try {
      const result = (await executeQuery('SELECT * FROM comments WHERE id = $1', [commentId]))[0];
      return result;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public updateComment = async (content: string, commentId: number) => {
    try {
      const updateCommentQuery = `
        UPDATE comments
        SET content = $1
        WHERE id = $2
        RETURNING *;
      `;

      const result = await executeQuery(updateCommentQuery, [content, commentId]);
      return result[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public deleteComment = async (commentId: number) => {
    try {
      const deleteCommentQuery = 'DELETE FROM comments WHERE id = $1 RETURNING *';
      const result = (await executeQuery(deleteCommentQuery, [commentId]))[0];
      return result;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default new CommentService();
