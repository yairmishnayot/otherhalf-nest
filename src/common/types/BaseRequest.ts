export interface BaseRequest extends Request {
  user: RequestUser;
}

export interface RequestUser {
  sub: number; // This is the id of the use inside the DB
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
