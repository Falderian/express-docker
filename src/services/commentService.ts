import { executeQuery } from "../config/db";
import { IUser, IComment, IPost } from "../types/types";
import userService from "./userService";
import PostService from './postService'

class CommentService {
  public getAllComments = async () => {
    try {
      const result = (await executeQuery('SELECT * FROM comments'));
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

  public getCommentsByPostId = async (postId: number): Promise<IComment[]> => {
    try {
      const query = 'SELECT * FROM comments WHERE post_id = $1';
      const result = await executeQuery(query, [postId]);
      return result as IComment[];
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

const createMultipleComments = async (count: number) => {
  const posts = (await PostService.getAllPosts());
  posts.forEach(async post => {
    try {
      for (let i = 1; i <= count; i++) {
        const newComment = await new CommentService().createComment(`Comment ${i} for post ${post.id}`, post.user_id, +post.id);
        console.log('New comment created');
      }
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  })

};
// createMultipleComments(100)

export default new CommentService();
