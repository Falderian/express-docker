import { Request, Response } from "express";
import userService from "../services/userService";
import userValidator from "../validators/userValidator";

class UserController {
  public getUsers = async (_: Request, res: Response) => {
    try {
      const users = (userService.getUsers())
      res.status(200).send(users);
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  public register = async (req: Request, res: Response) => {
    try {
      const errors = userValidator.validateUser(req);
      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const newUser = await userService.register(req.body);
      res.status(200).send('User with ' + newUser.username + ', ' + newUser.email + ' has been created');
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const isLogined = await userService.login(req.body);
      res.status(200).send(isLogined);
    } catch (error) {
      return res.status(500).send(error);
    }
  };
}

export default new UserController()
