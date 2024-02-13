import { executeQuery } from "../config/db"
import { IPost, } from "../types/types";
import userService from "./userService";

class PostService {
  public async getAllPosts(): Promise<IPost[]> {
    try {
      const query = "SELECT * FROM posts";
      const result = await executeQuery(query);
      return result as IPost[]; // Assuming result is an array of posts
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public getPost = async (postId: number) => {
    try {
      const result = (await executeQuery('SELECT * FROM posts WHERE id = $1', [postId]))[0];
      return result;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }


  public createPost = async (title: string, content: string, userId: number) => {
    try {
      const user = await userService.findUser(userId)
      if (user) {
        const result = (await executeQuery('INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *', [title, content, userId]))[0]
        return result
      } else {
        throw new Error('User not found')
      }
    } catch (error) {
      console.log(error)
      throw new Error((error as Error).message)
    }
  }

  public findPostById = async (postId: number) => {
    try {
      const result = (await executeQuery('SELECT * FROM posts WHERE id = $1', [postId]))[0];
      return result;
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public updatePost = async (title: string, content: string, postId: number) => {
    try {
      const updatePostQuery = `
        UPDATE posts
        SET title = $1, content = $2
        WHERE id = $3
        RETURNING *;
      `;

      const result = await executeQuery(updatePostQuery, [title, content, postId]);
      return result[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public deletePost = async (postId: number) => {
    try {
      const deletePostQuery = 'DELETE FROM posts WHERE id = $1 RETURNING *';
      const result = (await executeQuery(deletePostQuery, [postId]))[0];
      return result;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

// const createMultiplePosts = async (numPosts: number) => {
//   try {
//     for (let i = 0; i < numPosts; i++) {
//       const title = `Post ${i + 1}`;
//       const content = `Content for post ${i + 1}`;
//       const userId = 1;
//       const newPost = await (new PostService()).createPost(title, content, userId);
//       console.log(`Created post with ID: ${title}`);
//     }
//   } catch (error) {
//     console.error("Error creating posts:", error);
//   }
// };

// createMultiplePosts(20)

export default new PostService()
