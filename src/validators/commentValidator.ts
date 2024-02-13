import { validationResult, check, param } from 'express-validator';
import { Request } from 'express';

class CommentValidator {
  public validateComment(req: Request) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errors.array();
    }

    return [];
  }

  public contentValidation() {
    return [
      check('content').isLength({ min: 5, max: 200 }).withMessage('Content must be between 5 and 200 characters'),
    ];
  }

  public userIdValidation() {
    return [
      check('userId').notEmpty().withMessage('User ID is required').isInt().withMessage('Invalid user ID'),
    ];
  }

  public postIdValidation() {
    return [
      check('postId').notEmpty().withMessage('Post ID is required').isInt().withMessage('Invalid post ID'),
    ];
  }

  public commentIdValidation() {
    return [
      param('commentId').notEmpty().withMessage('Comment ID is required').isInt().withMessage('Invalid comment ID'),
    ];
  }
}

export default new CommentValidator();
