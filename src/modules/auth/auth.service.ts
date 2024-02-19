import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
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

    const payload = { sub: user.id, email: user.email };

    return {
      token: await this.jwtService.signAsync(payload),
      refreshToken: await this.generateRefreshToken(user),
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

  /**
   * Generating refresh token for a given user
   * @param user the user to generate the refresh token for
   * @returns {Promise<string>}
   */
  async generateRefreshToken(user: User): Promise<string> {
    const sevenDaysFromNow = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    // save refresh token to DB
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    const tokenEntity = this.refreshTokenRepository.create({
      token: refreshToken,
      expiryDate: sevenDaysFromNow,
    });

    tokenEntity.user = user;

    await this.refreshTokenRepository.save(tokenEntity);

    return refreshToken;
  }
}
