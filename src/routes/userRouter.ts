import express from "express";
import userController from "../controllers/userController";
import userValidator from "../validators/userValidator";

const userRouter = express.Router()

userRouter.get('/', userController.getUsers)

userRouter.post('/register',
  userValidator.emailValidation(),
  userValidator.usernameValidation(),
  userValidator.passwordValidation(),
  userController.register)

userRouter.post('/login', userController.login)

export default userRouter
