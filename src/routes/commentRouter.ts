import express from 'express';
import CommentController from '../controllers/commentController';
import postValidator from '../validators/postValidator';

const commentRouter = express.Router();

commentRouter.post(
  '/',
  postValidator.titleValidation(),
  postValidator.contentValidation(),
  postValidator.userIdValidation(),
  CommentController.createComment
);

commentRouter.get('/', CommentController.getAllComments);
commentRouter.get('/:postId', postValidator.validatePostId(), CommentController.getCommentsByPostId);

commentRouter.put(
  '/:postId',
  postValidator.validatePostUpdate,
  postValidator.validatePostId,
  CommentController.updateComment
);

commentRouter.delete('/:postId', postValidator.validatePostId(), CommentController.deleteComment);

export { commentRouter };
