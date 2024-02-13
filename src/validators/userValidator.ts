import { validationResult, check } from 'express-validator';
import { Request } from "express";

class UserValidator {
  public validateUser(req: Request) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return errors.array();
    }

    return [];
  }

  public emailValidation() {
    return [
      check('email').isEmail().withMessage('Invalid email format'),
    ];
  }

  public usernameValidation() {
    return [
      check('username').isLength({ min: 4, max: 20 }).withMessage('Username must be between 4 and 20 characters'),
    ];
  }

  public passwordValidation() {
    return [
      check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    ];
  }
}

export default new UserValidator();
