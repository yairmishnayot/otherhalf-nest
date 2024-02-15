import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signIn(email: string, pass: string): Promise<SignInResponseDto> {
    const user = await this.usersService.findByEmail(email);
    // Check if password matches
    if (!user) throw new UnauthorizedException();

    if (!(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    //TODO: update the last login date
    return {
      token: await this.jwtService.signAsync(payload),
      user: user,
    };
  }

  /**
   * Reset password using old password
   * @param passwordData
   * @param userId
   */
  async resetPasswordUsingOldPassword(
    passwordData: ResetPasswordDto,
    userId: number,
  ) {
    const user = await this.usersService.findOne(userId);

    if (
      !user ||
      !(await bcrypt.compare(passwordData.oldPassword, user?.password))
    ) {
      throw new UnauthorizedException();
    }

    user.password = await bcrypt.hash(passwordData.newPassword, 10);
    user.isFirstLogin = false;
    await this.userRepository.save(user);
  }
}
