import { executeQuery } from "../config/db"
import { IUser } from "../types/types"
import bcrypt from 'bcrypt'

class UserService {
  salt = 10
  pass_secret = process.env.PASSWORD_SECRET

  public async register(user: Omit<IUser, 'id'>) {
    try {
      const hashedPassword = await this.hashPassword(user.password)
      const result = await executeQuery<IUser>('INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *', [user.email, user.username, hashedPassword])
      const newUser = result
      return newUser[0]
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async login(user: Omit<IUser, 'id'>) {
    try {
      const foundUser: IUser | Error = await this.findUserByUsername(user.username);
      if (foundUser) {
        const isMatch = bcrypt.compareSync(user.password, (foundUser as IUser).password);
        if (isMatch) {
          return foundUser
        } else {
          throw new Error('Wrong password')
        }
      } else {
        throw new Error('Username of user is not correct');
      }
    } catch (error) {
      return error
    }
  }

  public async getUsers() {
    try {
      const users = await executeQuery('SELECT * FROM users')
      return users
    } catch (error) {
      return error
    }
  }

  public async findUserByUsername(username: string): Promise<IUser | Error> {
    try {
      const result = await executeQuery<IUser>('SELECT * FROM users WHERE username = $1', [username])
      return result[0]
    } catch (error) {
      console.error('Error finding user by username:', error);
      return error as Error;
    }
  }

  private async hashPassword(password: string) {
    password = await bcrypt.hash(password, this.salt)
    return password
  }
}

export default new UserService()
