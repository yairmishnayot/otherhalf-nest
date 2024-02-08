import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async signIn(email: string, pass: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findByEmail(email);

    // Check if password matches
    if (!user) throw new UnauthorizedException();

    if (!(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException();
    }

    // destructuring the user object to remove the password property
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object

    //TODO: update the last login date
    return result;
  }
}
