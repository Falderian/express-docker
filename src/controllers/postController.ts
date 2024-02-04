import { Request, Response } from 'express';
import postService from '../services/postService';
import postValidator from '../validators/postValidator';

class PostController {
  public getAllPosts = async (_: Request, res: Response) => {
    try {
      const posts = await postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      console.error('Error in getAllPosts:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public createPost = async (req: Request, res: Response) => {
    const errors = postValidator.validatePost(req);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    try {
      const { title, content, userId } = req.body;
      const createdPost = await postService.createPost(title, content, userId);
      res.status(201).json(createdPost);
    } catch (error) {
      console.error('Error in createPost:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public getPost = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const post = await postService.getPost(Number(postId));

      if (!post) {
        res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json(post);
    } catch (error) {
      console.error('Error in getPost:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public updatePost = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;

      const updatedPost = await postService.updatePost(title, content, Number(postId));

      if (!updatedPost) {
        res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error in updatePost:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public deletePost = async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const deletedPost = await postService.deletePost(Number(postId));

      if (!deletedPost) {
        res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json(deletedPost);
    } catch (error) {
      console.error('Error in deletePost:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new PostController();
