export interface BaseRequest extends Request {
  user: RequestUser;
}

interface RequestUser {
  sub: number;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
