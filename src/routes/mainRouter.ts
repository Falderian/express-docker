import express from 'express';
import userRouter from './userRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';

const mainRouter = express.Router()

mainRouter.use('/users', userRouter)
mainRouter.use('/posts', postRouter)
mainRouter.use('/comments', commentRouter)

export default mainRouter
