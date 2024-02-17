import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signIn(email: string, pass: string): Promise<SignInResponseDto> {
    const user = await this.usersService.findByEmail(email);

    // Check if password matches
    if (!user) throw new UnauthorizedException();

    if (!(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException();
    }

    user.lastLoggedAt = new Date();
    this.userRepository.save(user);
    // destructuring the user object to remove the password property
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }
}
