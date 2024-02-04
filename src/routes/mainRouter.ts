import express from 'express';
import userRouter from './userRouter';
import { postRouter } from './postRouter';

const mainRouter = express.Router()

mainRouter.use('/user', userRouter)
mainRouter.use('/posts', postRouter)

export default mainRouter
