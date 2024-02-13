import { Request, Response } from 'express';
import commentService from '../services/commentService';
import commentValidator from '../validators/commentValidator';

class CommentController {
  public getAllComments = async (_: Request, res: Response) => {
    try {
      const comments = await commentService.getAllComments();
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error in getAllComments:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public createComment = async (req: Request, res: Response) => {
    const errors = commentValidator.validateComment(req);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    try {
      const { content, userId, postId } = req.body;
      const createdComment = await commentService.createComment(content, userId, postId);

      res.status(201).json(createdComment);
    } catch (error) {
      console.error('Error in createComment:', error);
      res.status(404).send((error as Error).message);
    }
  }

  public getCommentsByPostId = async (req: Request, res: Response): Promise<void> => {
    try {
      const postId: number = parseInt(req.params.postId, 10);
      const comments = await commentService.getCommentsByPostId(postId);
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error in getCommentsByPostId:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public getCommentById = async (req: Request, res: Response) => {
    try {
      const { commentId } = req.params;
      const comment = await commentService.getCommentById(Number(commentId));

      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      }

      res.status(200).json(comment);
    } catch (error) {
      console.error('Error in getCommentById:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public updateComment = async (req: Request, res: Response) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;

      const updatedComment = await commentService.updateComment(content, Number(commentId));

      if (!updatedComment) {
        res.status(404).json({ message: 'Comment not found' });
      }

      res.status(200).json(updatedComment);
    } catch (error) {
      console.error('Error in updateComment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public deleteComment = async (req: Request, res: Response) => {
    try {
      const { commentId } = req.params;
      const deletedComment = await commentService.deleteComment(Number(commentId));

      if (!deletedComment) {
        res.status(404).json({ message: 'Comment not found' });
      }

      res.status(200).json(deletedComment);
    } catch (error) {
      console.error('Error in deleteComment:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new CommentController();
