import express from 'express';
import postController from '../controllers/postController';
import postValidator from '../validators/postValidator';

const postRouter = express.Router();

postRouter.post(
  '/',
  postValidator.titleValidation(),
  postValidator.contentValidation(),
  postValidator.userIdValidation(),
  postController.createPost
);

postRouter.get('/', postController.getAllPosts);

postRouter.get('/:postId', postValidator.validatePostId, postController.getPost);

postRouter.put(
  '/:postId',
  postValidator.validatePostUpdate,
  postValidator.validatePostId,
  postController.updatePost
);

postRouter.delete('/:postId', postValidator.validatePostId, postController.deletePost);

export { postRouter };
