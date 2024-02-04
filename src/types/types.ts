interface IUser {
  id: number,
  email: string,
  username: string,
  password: string
}
interface IComment {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
}

interface IPost {
  id: number;
  title: string;
  content: string;
  user_id: number;
}

export { IUser, IComment, IPost }
