import { validationResult, check, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import postService from '../services/postService';

class PostValidator {
  public validatePostId() {
    return [
      param('postId').notEmpty().withMessage('Post ID is required').isInt().withMessage('Invalid post ID'),
    ];
  }

  public validatePostUpdate() {
    return [
      check('title').optional().isLength({ min: 5, max: 50 }).withMessage('Title must be between 5 and 50 characters'),
      check('content').optional().isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
    ];
  }

  public async validatePostIdExistence(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const postExists = await postService.findPostById(+postId);

    if (!postExists) {
      return res.status(404).json({ message: 'Post not found' });
    }

    next();
  }

  public validatePost(req: Request) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errors.array();
    }

    return [];
  }

  public titleValidation() {
    return [
      check('title').isLength({ min: 5, max: 50 }).withMessage('Title must be between 5 and 50 characters'),
    ];
  }

  public contentValidation() {
    return [
      check('content').isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
    ];
  }

  public userIdValidation() {
    return [
      check('userId').notEmpty().withMessage('User ID is required').isInt().withMessage('Invalid user ID'),
    ];
  }
}

export default new PostValidator();
